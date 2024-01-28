import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useForm, Controller} from 'react-hook-form';
import {DevTool} from '@hookform/devtools';
import {useDropzone} from 'react-dropzone';
import {useMutation, useQueryClient} from 'react-query';
import axios from 'axios';
import {
    Box, Button, VStack, FormControl, FormLabel, Image, Input, Textarea,
    HStack, useBoolean, useTheme, useColorModeValue, FormErrorMessage,
    useToast,
} from '@chakra-ui/react';
// import { getClosestMatch } from '../config/helperfunctions';
import {Select} from "chakra-react-select";


//local imports
import {textureMapOptionsPBRMetalRough, textureMapOptionsPBRGlossSpec, textureMapOptionsCommon, materialTypeOptions, metaDataOptions} from '../config/formInputData';
import {useMaterialStore, useProgressStore, useAutosuggestionStore, useFormMode, useIsLoadingStore, useGeneratedImagesStore} from '../store/store';
import SuggestionDisplay from './UI/SuggestionDisplay';



export default function MaterialUploadForm() {



    //react-hook-form
    const {register, handleSubmit, control, watch, reset, setError, setFocus, setValue, formState: {errors}} = useForm();

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
    const {formData, setFileData, setMaterialData, imagePreviews, setImagePreviews} = useMaterialStore();
    const {progress, increaseProgress, decreaseProgress, resetProgress} = useProgressStore();
    const {mode} = useFormMode();
    const {isLoading, setIsLoading} = useIsLoadingStore();
    // const {albedoImage, pbrImages, setAlbedoImage, setPBRImage, clearImages} = useGeneratedImagesStore();
    const {setAlbedoImage, setPBRImage, clearImages} = useGeneratedImagesStore();

    //autosuggestion zustand states
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



    //other imports
    const navigate = useNavigate();
    const toast = useToast();


    //### USE EFFECTS ####//
    // ------------------ //    
    // auto loads/renders options/selections for texture maps based on material type selection
    useEffect(() => {
        if (materialType && materialType.value === "custom") {
            setValue('materialTextures', []);
            setTextureMapOptions(textureMapOptionsCommon);
        } else {
            const defaultTextures = defaultTextureMapSelections[materialType?.value] || [];
            setTextureMapOptions(defaultTextures);
            setValue('materialTextures', defaultTextures);
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
        setMaterialData({...formData.materialData, materialTextures, materialType, materialMetadata, color, elementType, condition, manifestation});
    }, [materialTextures, materialType, materialMetadata, color, elementType, condition, manifestation, setMaterialData]);



    //HTTP POST REQUESTS & ASYNCHRONOUS STUFF//
    // ---------------- //

    const handleFormSubmission = async (data) => {

        // Check if required fields for the second page are filled
        if (progress === 1) {
            if (!color || !elementType || !manifestation || !condition) {
                toast({
                    title: "Validation Error",
                    description: "Please fill in all required fields.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                    // Styling the toast container
                    // containerStyle: {
                    //     maxWidth: '400px',
                    //     border: '2px solid teal',
                    //     bg: 'blue.400',
                    //     color: 'white',
                    //     borderRadius: '10px',
                    //     boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.05)',
                    // },
                    // // // Customizing the style for different parts of the toast
                    // // style: {
                    // //     color: 'white',
                    // //     bg: 'blue.300',
                    // //     padding: '16px',
                    // // }
                });
                return;
            }
        }

        clearImages();       // Clear any existing images before loading new ones
        setIsLoading(true);  // Start loading indicator

        try {
            const materialData = {...formData.materialData, ...data};
            // API call to generate the albedo texture
            const textureResponse = await axios.post('http://localhost:3001/api/generate_albedo', {materialData});
            console.log("Albedo texture generation initiated!");
            const materialId = textureResponse.data.material_id;
            const baseColorUrl = textureResponse.data.image_url;

            // Set the albedo image in the store
            setAlbedoImage(baseColorUrl);
            console.log(`Albedo url ${baseColorUrl} added to store.`);

            // Navigate to the loading page with materialId
            navigate('/loading-textures', {state: {materialId}});

            // Second API call to generate PBR maps
            const pbrResponse = await axios.post('http://localhost:3001/api/generate_pbr_maps', {base_color_url: baseColorUrl, material_id: materialId});
            console.log("PBR maps generation initiated!");

            // PBR MAPS LOAD HERE!!!!!!!!

            // Set PBR maps in the store
            const maps = pbrResponse.data.pbr_maps;
            setPBRImage('normal', maps.normal_map_url);
            setPBRImage('height', maps.height_map_url);
            setPBRImage('smoothness', maps.smoothness_map_url);
        } catch (error) {
            console.error("Error during form submission:", error);
            // Optionally handle the error, e.g., show toast
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };



    // ### HELPER FUNCTIONS ### //
    // ----------------------- //
    // -----------------------//

    //handles form submission of filedata w/ dropzone
    const {getRootProps, getInputProps} = useDropzone({
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
                break;
            case 'elementType':
                setElementTypeSuggestion(value);
                break;
            case 'condition':
                setConditionSuggestion(value);
                break;
            case 'manifestation':
                setManifestationSuggestion(value);
                break;
            default:
                break;
        }
    };

    // ### RENDERING ### //
    // ---------------- //
    //handles navigation between form steps via progress var's global state
    const handleNext = () => {
        if (progress === 0 && mode === 0) {
            // Perform validation checks here before increasing progress
            // For example, check if required fields are filled
            if (!materialType || !materialTextures.length) {
                // Do not increase progress if validation fails
                toast({
                    title: "Validation Error",
                    description: "Please fill in all required fields.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                });
                return;
            }
            increaseProgress();
        } else if (progress === 1 && mode === 0) {
            return;
        } else if (progress < 2 && mode === 1) {
            increaseProgress();
        } else if (progress === 2 && mode === 1) {
            return;
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
        reset({...defaultValues});
        resetProgress();
        clearAllSuggestions()
        console.log("Form Data Flushed! Default Values Set To:", FormData);
        setImagePreviews([]);
        setFileData([]);
        setMaterialData({});
        clearImages();
    }


    return (
        <>
            <Box as="form" onSubmit={handleSubmit(handleFormSubmission)} p={5}>


                {/* Material Type Selection */}
                {progress === 0 && (
                    <FormControl mb={4} isInvalid={errors.materialType}>
                        <FormLabel htmlFor="materialType">Material Type</FormLabel>
                        <Controller
                            name="materialType"
                            control={control}
                            rules={progress === 0 ? {required: "Material Type is required"} : {}}
                            render={({field}) => (
                                <>
                                    <Select
                                        {...field}
                                        options={materialTypeOptions}
                                        placeholder="Select Material Type"
                                        closeMenuOnSelect={true}
                                        variant="flushed"
                                        colorScheme="blue"

                                    />
                                </>
                            )}
                        />
                        {errors.materialType && <FormErrorMessage>{errors.materialType.message}</FormErrorMessage>}

                    </FormControl>
                )}


                {/* Texture Maps Selection */}
                {progress === 0 && (
                    <FormControl mb={4} isInvalid={errors.materialTextures}>
                        <FormLabel htmlFor="materialTextures">Texture Maps</FormLabel>
                        <Controller
                            name="materialTextures"
                            control={control}
                            rules={progress === 0 ? {required: "Material Textures are required"} : {}}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    options={textureMapOptions}
                                    placeholder="Choose texture maps for material..."
                                    isMulti
                                    closeMenuOnSelect={false}
                                    selectedOptionStyle="check"
                                    hideSelectedOptions={true}
                                    variant="flushed"
                                    colorScheme="blue"

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
                            render={({field}) => (
                                <Select {...field}
                                    options={metaDataOptions}
                                    placeholder="Add additional metadata about material..."
                                    isMulti
                                    closeMenuOnSelect={false}
                                    selectedOptionStyle="check"
                                    hideSelectedOptions={false}
                                    variant="flushed"
                                    colorScheme="blue"
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


                {/* MODE 1: Manual File Upload Section */}
                {progress === 2 && mode === 1 && (
                    <>
                        <FormControl mb={4}>
                            <FormLabel>Upload Texture Files</FormLabel>
                            <div {...getRootProps()} style={{border: '2px dashed gray', padding: '20px', textAlign: 'center', cursor: 'pointer'}}>
                                <input {...getInputProps()} />
                                <p>Drag 'n' drop files here, or click to select files</p>
                            </div>

                        </FormControl>
                    </>
                )}


                {/* Navigation Buttons; Next and Submit have diff functions based on progress state */}
                <HStack spacing={4} py={'1rem'}>

                    <Button colorScheme="blue" w="full" onClick={flushFormData}>Reset</Button>

                    {progress > 0 && (
                        <Button colorScheme="blue" w="full" onClick={() => decreaseProgress()}>Back</Button>
                    )}

                    {/* Mode 0 : Default */}
                    {progress < 1 && mode === 0 && (
                        <Button colorScheme="green" w="full" onClick={handleNext}>
                            {'Next'}
                        </Button>
                    )}
                    {progress === 1 && mode === 0 && (
                        <Button type="submit" colorScheme="green" w="full"
                        //onClick={toastPromiseOnClick}
                        >
                            {'Submit'}
                        </Button>
                    )}
                    {/* MODE 1 : Manual Uploads */}
                    {progress < 2 && mode === 1 && (
                        <Button colorScheme="green" w="full" onClick={handleNext}>
                            {'Next'}
                        </Button>
                    )}
                    {progress === 2 && mode === 1 && (
                        <Button type="submit" colorScheme="green" w="full"
                        //onClick={toastPromiseOnClick}
                        >
                            {'Submit'}
                        </Button>
                    )}
                </HStack>


            </Box>
            {/* <DevTool control={control} /> */}
        </>
    );
}
