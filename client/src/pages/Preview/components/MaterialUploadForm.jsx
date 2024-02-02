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
import {textureMapOptionsPBRMetalRough, textureMapOptionsPBRGlossSpec, textureMapOptionsCommon, materialTypeOptions, metaDataOptions} from '../../../config/formInputData';
import {useMaterialStore, useProgressStore, useAutosuggestionStore, useFormMode, useIsLoadingStore, useGeneratedImagesStore} from '../../../store/store';
import SuggestionDisplay from './SuggestionDisplay';
// import {API_URL} from './client/src/config/URLConfig.js'



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

                });
                return;
            }
        }

        clearImages();       // Clear any existing images before loading new ones
        setIsLoading(true);  // Start loading indicator

        try {
            const materialData = {...formData.materialData, ...data};
            // API call to generate the albedo texture
            const textureResponse = await axios.post('/api/generate_albedo', {materialData});
            console.log("Albedo texture generation initiated!");
            const materialId = textureResponse.data.material_id;
            const baseColorUrl = textureResponse.data.image_url;

            // Set the albedo image in the store
            setAlbedoImage(baseColorUrl);
            console.log(`Albedo url ${baseColorUrl} added to store.`);

            // Navigate to the loading page with materialId
            navigate('/loading-textures', {state: {materialId}});

            // Second API call to generate PBR maps
            const pbrResponse = await axios.post('/api/generate_pbr_maps', {base_color_url: baseColorUrl, material_id: materialId});
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
            <Box as="form" onSubmit={handleSubmit(handleFormSubmission)} p={5}
                textColor={useColorModeValue('blackAlpha.800', 'whiteAlpha.800')}
            >


                {/* Material Type Selection */}
                {progress === 0 && (
                    <FormControl mb={4} isInvalid={errors.materialType}>
                        <FormLabel
                            textColor={useColorModeValue('whiteAlpha.800', 'whiteAlpha.800')}

                            htmlFor="materialType">Material Type</FormLabel>
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
                                    // colorScheme={useColorModeValue('blue', 'purple')}



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
                        <FormLabel
                            textColor={useColorModeValue('whiteAlpha.800', 'whiteAlpha.800')}

                            htmlFor="materialTextures">Texture Maps</FormLabel>
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
                                    colorScheme={useColorModeValue('blue', 'teal')}

                                />
                            )}
                        />
                    </FormControl>
                )}



                {/* Additional Metadata/Software Info */}
                {progress === 0 && (
                    <FormControl mb={4}>
                        <FormLabel
                            textColor={useColorModeValue('whiteAlpha.800', 'whiteAlpha.800')}

                            htmlFor="materialMetadata">Additional Meta-Data</FormLabel>
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
                                    colorScheme={useColorModeValue('blue', 'teal')}
                                />
                            )}
                        />
                    </FormControl>
                )}


                {/* Additional Form Controls for Material Physical Attributes:Row1 */}
                {progress === 1 && (
                    <HStack spacing={4} py={'.5rem'}>
                        <FormControl mb={4}>
                            <FormLabel
                                textColor={useColorModeValue('whiteAlpha.800', 'whiteAlpha.800')}

                                htmlFor="color">Color/Luminance</FormLabel>
                            <Input
                                id="color"
                                name="color"
                                {...register('color')}
                                placeholder={"e.g. red, bright, rich, dark, etc..."}
                                onChange={(e) => onInputChange(e, 'color')}
                                sx={manifestationSuggestion ? {color: useColorModeValue('white', 'white')} : {}}

                            />
                            <SuggestionDisplay inputValue={color} suggestions={colorSuggestion} />

                        </FormControl>

                        <FormControl mb={4}>
                            <FormLabel
                                textColor={useColorModeValue('whiteAlpha.800', 'whiteAlpha.800')}

                                htmlFor="elementType">Element/Type</FormLabel>
                            <Input
                                id="elementType"
                                name="elementType"
                                {...register('elementType')}
                                placeholder={"e.g. wood, metal, fabric, ceramic, etc..."}
                                onChange={(e) => onInputChange(e, 'elementType')}
                                sx={manifestationSuggestion ? {color: useColorModeValue('white', 'white')} : {}}

                            />
                            <SuggestionDisplay inputValue={elementType} suggestions={elementTypeSuggestion} />

                        </FormControl>
                    </HStack>
                )}


                {/* Additional Form Controls for Material Physical Attributes: Row2 */}
                {progress === 1 && (
                    <HStack spacing={4} py={'.5rem'}>
                        <FormControl mb={4}>
                            <FormLabel
                                textColor={useColorModeValue('whiteAlpha.800', 'whiteAlpha.800')}

                                htmlFor="manifestation">Manifestation/Form</FormLabel>
                            <Input
                                id="manifestation"
                                name="manifestation"
                                {...register('manifestation')}
                                placeholder={"e.g. flooring, wall, tiles, counter, etc..."}
                                onChange={(e) => onInputChange(e, 'manifestation')}
                                sx={manifestationSuggestion ? {color: useColorModeValue('white', 'white')} : {}}
                            />
                            <SuggestionDisplay inputValue={manifestation} suggestions={manifestationSuggestion} />

                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel

                                textColor={useColorModeValue('whiteAlpha.800', 'whiteAlpha.800')}
                                htmlFor="condition">Condition/State</FormLabel>
                            <Input
                                id="condition"
                                name="condition"
                                {...register('condition')}
                                placeholder={"e.g. new, dusty, worn, etc..."}
                                onChange={(e) => onInputChange(e, 'condition')}
                                sx={manifestationSuggestion ? {color: useColorModeValue('white', 'white')} : {}}
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

                    <Button color='white' bg={useColorModeValue('blue.800', 'purple.800')} w='full' onClick={flushFormData}>Reset</Button>

                    {progress > 0 && (
                        <Button color='white' bg={useColorModeValue('blue.500', 'purple.500')} w='full' onClick={() => decreaseProgress()}>Back</Button>
                    )}

                    {/* Mode 0 : Default */}
                    {progress < 1 && mode === 0 && (
                        <Button color='white' bg={useColorModeValue('green.400', 'green.500')} w='full' onClick={handleNext}>
                            {'Next'}
                        </Button>
                    )}
                    {progress === 1 && mode === 0 && (
                        <Button type="submit" bg={useColorModeValue('teal.400', 'green.500')} w="full"
                            color='white'
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

        </>
    );
}
