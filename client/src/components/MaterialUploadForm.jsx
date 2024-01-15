import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useDropzone } from 'react-dropzone';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import {
    Box, Button, VStack, FormControl, FormLabel, Image, Input, Textarea,
    HStack, useBoolean, useTheme, useColorModeValue, 
    useToast, 
} from '@chakra-ui/react';
// import { getClosestMatch } from '../config/helperfunctions';
import { Select } from "chakra-react-select";

//local imports
import { textureMapOptionsPBRMetalRough, textureMapOptionsPBRGlossSpec, textureMapOptionsCommon, materialTypeOptions, metaDataOptions } from '../config/formInputData';
import { useMaterialStore, useProgressStore, useAutosuggestionStore } from '../store/store';
import SuggestionDisplay from './UI/SuggestionDisplay';



export default function MaterialUploadForm() {

    //react-hook-form
    const { register, handleSubmit, control, watch, reset, setError, setFocus, setValue } = useForm();

    //query client
    const queryClient = useQueryClient();
    const [textureMapOptions, setTextureMapOptions] = useState(textureMapOptionsCommon);

    //hook form watch fields
    const materialType = watch("materialType");
    const materialMetadata = watch("materialMetadata");
    const materialTextures = watch("materialTextures");
    const color = watch("color");
    const elementType = watch("elementType");
    const condition = watch("condition");
    const manifestation = watch("manifestation");


    //zustand global states
    const { formData, setFileData, setMaterialData, imagePreviews, setImagePreviews, generatedImages, setGeneratedImages } = useMaterialStore();
    const { progress, increaseProgress, decreaseProgress, resetProgress } = useProgressStore();
    const theme = useTheme(); // Access chakra theme for styling

    const {
        colorSuggestion, setColorSuggestion,
        elementTypeSuggestion, setElementTypeSuggestion,
        conditionSuggestion, setConditionSuggestion,
        manifestationSuggestion, setManifestationSuggestion,
        clearAllSuggestions,
    } = useAutosuggestionStore();



    //var for setting texture selections based on material type
    const defaultTextureMapSelections = {
        metallic: textureMapOptionsPBRMetalRough,
        glossy: textureMapOptionsPBRGlossSpec,
        custom: [],
    };

    //### USE EFFECTS ####//
    // ------------------ //    
    // auto loads/renders options/selections for texture maps based on material type selection
    useEffect(() => {
        if (materialType && materialType.value) {
            // Get the default texture maps for the selected material type
            const defaultTextures = defaultTextureMapSelections[materialType.value];
            if (materialType.value === "custom") {
                setValue('materialTextures', defaultTextures);
                setTextureMapOptions(textureMapOptionsCommon);
                return;
            }

            if (defaultTextures) {
                setTextureMapOptions(defaultTextures);
                setValue('materialTextures', defaultTextures);
            }
        }
    }, [materialType, setValue]);


    // cleanup function 4 memory leak prevantage; called when components unmount/imagePreviews arr changes
    useEffect(() => {
        return () => {
            imagePreviews.forEach(preview => {
                if (preview.preview) {
                    // revoke blob URL to free up memory
                    URL.revokeObjectURL(preview.preview);
                }
            });
        };
    }, [imagePreviews]); // cleanup function runs when imagePreviews changes


    //updates zustand state with form data upon changing any of the form fields
    useEffect(() => {
        setMaterialData({ ...formData.materialData, materialTextures, materialType, materialMetadata, color, elementType, condition, manifestation });
        console.table(formData.materialData)
    }, [materialTextures, materialType, materialMetadata, color, elementType, condition, manifestation, setMaterialData]);


    //logs image preview file data if using async method (fileapi vs base64)
    useEffect(() => {
        console.log(imagePreviews);
    }, [imagePreviews]);



    //HTTP POST REQUESTS & ASYNCHRONOUS STUFF//
    // ---------------- //
    //react-query + axios integration

    // react-query mutation for sending form data to Flask backend//
    const sendFormDataMutation = useMutation(
        formData => axios.post('/api/generate_texture', formData),
        {
          onSuccess: (response) => {
            //update zustand store for image urls
            setGeneratedImages(prevImages => [...prevImages, response.data.image_url]);
            queryClient.invalidateQueries('textureData');
          },
          onError: (error) => {
            console.error("Error in sending form data:", error);
            // Handle error appropriately
          }
        }
      );


    //submit handler via mutation function using axios post request//
    const onSubmit = async () => {
        try {
          
            //post and log request to server w/ form data via usemutation hook

            console.log("Submitting form data:", formData.materialData);
            await sendFormDataMutation.mutateAsync({ materialData: formData.materialData });

        } catch (error) {
            // Handle submission error
            console.error("Submission error:", error);
            toast({
                title: "Error submitting form.",
                description: "Unable to process the request.",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    // ### HELPER FUNCTIONS ### //
    // ----------------------- //
    // -----------------------//

    //handles form submission of filedata w/ dropzone
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: acceptedFiles => {
            setImagePreviews(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
            setFileData(acceptedFiles.map(file => ({
                filename: file.name,
                size: file.size,
                type: file.type
            })));
        }
    });

    // Handle input changes for autosuggestion
    const onInputChange = (e, type) => {
        const value = e.target.value;
        setValue(type, value);
        switch (type) {
            case 'color':
                setColorSuggestion(value);
                console.log("Color Suggestion:", colorSuggestion);
                break;
            case 'elementType':
                setElementTypeSuggestion(value);
                console.log("Element Type Suggestion:", elementTypeSuggestion);
                break;
            case 'condition':
                setConditionSuggestion(value);
                console.log("Condition Suggestion:", conditionSuggestion);
                break;
            case 'manifestation':
                setManifestationSuggestion(value);
                console.log("Manifestation Suggestion:", manifestationSuggestion);
                break;
            default:
                break;
        }
    };

    // ### RENDERING ### //
    // ---------------- //
    //handles navigation between form steps via progress var's global state
    const handleNext = () => {
        if (progress < 2) {
            increaseProgress();
        } else {
            handleSubmit(onSubmit)();
        }
    };

    //resets all form data to default/blank values 
    const flushFormData = () => {
        let defaultValues = {};
        defaultValues.materialTextures = [];
        defaultValues.materialType = [];
        defaultValues.materialMetadata = [];
        defaultValues.color = "";
        defaultValues.elementType = "";
        defaultValues.condition = "";
        defaultValues.manifestation = "";
        reset({ ...defaultValues });
        resetProgress();
        clearAllSuggestions()
        console.log("Form Data Flushed! Default Values Set To:", FormData);
        setImagePreviews([]);
        setFileData([]);
        setMaterialData({});
    }


    return (
        <>
            <Box as="form" onSubmit={handleSubmit(onSubmit)} p={5}>


                {/* Material Type Selection */}
                {progress === 0 && (
                    <FormControl mb={4}>
                        <FormLabel htmlFor="materialType">Material Type</FormLabel>
                        <Controller
                            name="materialType"
                            id="materialType"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={materialTypeOptions}
                                    placeholder="Select Material Type"
                                    closeMenuOnSelect={true}
                                    variant="flushed"
                                />
                            )}
                        />
                    </FormControl>
                )}


                {/* Texture Maps Selection */}
                {progress === 0 && (
                    <FormControl mb={4}>
                        <FormLabel htmlFor="materialTextures">Texture Maps</FormLabel>
                        <Controller
                            name="materialTextures"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={textureMapOptions}
                                    placeholder="Choose texture maps for material..."
                                    isMulti
                                    closeMenuOnSelect={false}
                                    selectedOptionStyle="check"
                                    hideSelectedOptions={true}
                                />
                            )}
                        />
                    </FormControl>
                )}



                {/* Additional Metadata/Software Info */}
                {progress === 0 && (
                    <FormControl mb={4}>
                        <FormLabel htmlFor="materialMetadata">Additional Meta-Data</FormLabel>
                        <Controller
                            name="materialMetadata"
                            id="materialMetadata"
                            control={control}
                            render={({ field }) => (
                                <Select {...field}
                                    options={metaDataOptions}
                                    placeholder="Add additional metadata about material..."
                                    isMulti
                                    closeMenuOnSelect={false}
                                    selectedOptionStyle="check"
                                    hideSelectedOptions={false}
                                />
                            )}
                        />
                    </FormControl>
                )}


                {/* Additional Form Controls for Material Physical Attributes:Row1 */}
                {progress === 1 && (
                    <HStack spacing={4} py={'.5rem'}>
                        <FormControl mb={4}>
                            <FormLabel htmlFor="color">Color/Shade/Luminosity</FormLabel>
                            <Input
                                id="color"
                                name="color"
                                {...register('color')}
                                // placeholder={colorSuggestion}
                                onChange={(e) => onInputChange(e, 'color')}
                            // sx={colorInput ? {} : { color: 'grey.500' }} // Using grey color from the theme
                            />
                            <SuggestionDisplay inputValue={color} suggestions={colorSuggestion} />

                        </FormControl>

                        <FormControl mb={4}>
                            <FormLabel htmlFor="elementType">Element/Type</FormLabel>
                            <Input
                                id="elementType"
                                name="elementType"
                                {...register('elementType')}
                                // placeholder={elementTypeSuggestion}
                                onChange={(e) => onInputChange(e, 'elementType')}
                            // sx={elementTypeSuggestion ? { color: theme.colors.gray[500] } : {}}
                            />
                            <SuggestionDisplay inputValue={elementType} suggestions={elementTypeSuggestion} />

                        </FormControl>
                    </HStack>
                )}


                {/* Additional Form Controls for Material Physical Attributes: Row2 */}
                {progress === 1 && (
                    <HStack spacing={4} py={'.5rem'}>
                        <FormControl mb={4}>
                            <FormLabel htmlFor="manifestation">Manifestation/Form</FormLabel>
                            <Input
                                id="manifestation"
                                name="manifestation"
                                {...register('manifestation')}
                                // placeholder={manifestationSuggestion}
                                onChange={(e) => onInputChange(e, 'manifestation')}
                            // sx={manifestationSuggestion ? { color: theme.colors.gray[500] } : {}}
                            />
                            <SuggestionDisplay inputValue={manifestation} suggestions={manifestationSuggestion} />

                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel htmlFor="condition">Condition</FormLabel>
                            <Input
                                id="condition"
                                name="condition"
                                {...register('condition')}
                                // placeholder={conditionSuggestion}
                                onChange={(e) => onInputChange(e, 'condition')}
                            // sx={conditionSuggestion ? { color: theme.colors.gray[500] } : {}}
                            />
                            <SuggestionDisplay inputValue={condition} suggestions={conditionSuggestion} />
                        </FormControl>

                    </HStack>

                )}


                {/* File Upload Section */}
                {progress === 2 && (
                    <>
                        <FormControl mb={4}>
                            <FormLabel>Upload Texture Files</FormLabel>
                            <div {...getRootProps()} style={{ border: '2px dashed gray', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
                                <input {...getInputProps()} />
                                <p>Drag 'n' drop files here, or click to select files</p>
                            </div>
    
                        </FormControl>
                    </>
                )}


                {/* Navigation Buttons; Next and Submit have diff functions based on progress state */}
                <HStack spacing={4} py={'1rem'}>
                    <Button colorScheme="blue" w="full" onClick={() => flushFormData()}>Reset</Button>
                    {progress > 0 && (
                        <Button colorScheme="blue" w="full" onClick={decreaseProgress}>Back</Button>
                    )}
                    {progress < 2 && (
                    <Button colorScheme="green" w="full" onClick={handleNext}>
                        {'Next'}
                    </Button>
                    )}
                    {progress === 2 && (
                        <Button colorScheme="green" w="full" 
                        // onClick={toastPromiseOnClick}
                        >
                            {'Submit'}
                        </Button>
                    )}
                </HStack>


            </Box>
            <DevTool control={control} />
        </>
    );
}
