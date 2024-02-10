import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useForm, Controller} from 'react-hook-form';
import {DevTool} from '@hookform/devtools';
import axios from 'axios';
import {
    Box, Button, VStack, FormControl, FormLabel, Image, Input, Textarea,
    HStack, useBoolean, useTheme, useColorModeValue, FormErrorMessage,
    useToast,
} from '@chakra-ui/react';

import {Select} from "chakra-react-select";

//local imports
import {textureMapOptionsPBRMetalRough, textureMapOptionsPBRGlossSpec, textureMapOptionsCommon, materialTypeOptions, metaDataOptions} from '../../../config/formInputData';
import {useMaterialStore, useProgressStore, useAutosuggestionStore, useIsLoadingStore, useGeneratedImagesStore} from '../../../store/store';
import SuggestionDisplay from './SuggestionDisplay';




export default function MaterialUploadForm() {





    //react-hook-form
    const {register, handleSubmit, control, watch, reset, setError, setFocus, setValue, formState: {errors}} = useForm();


    //hook form watch fields
    const materialType = watch("materialType");
    const materialMetadata = watch("materialMetadata");
    const materialTextures = watch("materialTextures");
    const color = watch("color");
    const elementType = watch("elementType");
    const condition = watch("condition");
    const manifestation = watch("manifestation");


    //zustand global states
    const {formData, setFileData, setMaterialData} = useMaterialStore();
    const {progress, increaseProgress, decreaseProgress, resetProgress} = useProgressStore();
    const {isLoading, setIsLoading} = useIsLoadingStore();
    const {setAlbedoImage, setPBRImage, clearImages, albedoImage, pbrImages} = useGeneratedImagesStore();

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

    //other var definitions
    const navigate = useNavigate();
    const toast = useToast();


    //### USE EFFECTS ####//
    // ------------------ //    
    // auto loads/renders options/selections for texture maps based on material type selection
    const [textureMapOptions, setTextureMapOptions] = useState(textureMapOptionsCommon);
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



    //updates zustand state with form data upon changing any of the form fields
    useEffect(() => {
        setMaterialData({...formData.materialData, materialTextures, materialType, materialMetadata, color, elementType, condition, manifestation});
    }, [materialTextures, materialType, materialMetadata, color, elementType, condition, manifestation, setMaterialData]);



    //HTTP POST REQUESTS & ASYNCHRONOUS STUFF//
    // ---------------- //

    const handleFormSubmission = async (data) => {

        clearImages();       // Clear any existing images before loading new ones
        setIsLoading(true);  // Start loading indicator

        try {

            const materialData = {...formData.materialData, ...data};

            // API call to generate the albedo texture
            const textureResponse = await axios.post(`${import.meta.env.VITE_API_URL}generate_albedo`, {materialData});
            console.log("Albedo texture generation initiated!");
            const materialId = textureResponse.data.material_id;
            const baseColorUrl = textureResponse.data.image_url;

            //debugging: log formdata and materialdata
            console.log('logging form data!:', {'formdata': formData, 'materialData': materialData});

            // Set the albedo image in the store
            setAlbedoImage(baseColorUrl);
            console.log(`Albedo ID ${materialId} url ${baseColorUrl} added to store.`);

            // Navigate to the loading page with materialId
            // navigate('/loading-textures', {state: {materialId}});
            navigate(`/gallery_id/${materialId}`);

            // Second API call to generate PBR maps
            const pbrResponse = await axios.post(`${import.meta.env.VITE_API_URL}generate_pbr_maps`, {base_color_url: baseColorUrl, material_id: materialId});
            console.log("PBR maps generation initiated!");

            // PBR MAPS LOAD HERE!!!!!!!!
            // Set PBR maps in zustand store
            const maps = pbrResponse.data.pbr_maps;
            console.log("PBR maps generated sucessfully!", pbrResponse.data);
            setPBRImage('normal', maps.normal_map_url);
            setPBRImage('height', maps.height_map_url);
            setPBRImage('smoothness', maps.smoothness_map_url);

        } catch (error) {
            console.error("Error during form submission:", error);

        } finally {
            setIsLoading(false); // Reset loading state
        }
    };



    // ### HELPER FUNCTIONS ### //
    // ----------------------- //
    // -----------------------//


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
        if (progress === 0) {
            // validation checks before increasing form progress
            if (!materialType || !materialTextures.length) {
                // Do not increase progress if validation fails
                toast({
                    title: "Validation Error",
                    description: "Please fill in all required fields.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    variant: 'subtle',
                    colorScheme: 'purple',
                    position: "top",
                });
                return;
            }
            increaseProgress();
        } else if (progress === 1) {
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
            increaseProgress();
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
        setFileData([]);
        setMaterialData({});
        clearImages();
    }


    return (
        <Box >

            <Box as="form" onSubmit={handleSubmit(handleFormSubmission)} p={5}
            // textColor={useColorModeValue('blackAlpha.800', 'whiteAlpha.800')}
            >


                {/* Material Type Selection */}
                {progress === 0 && (
                    <FormControl mb={4} isInvalid={errors.materialType}>
                        <FormLabel
                            textColor={'whiteAlpha.800'}
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
                            textColor={'whiteAlpha.800'}

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
                            textColor={'whiteAlpha.800'}
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
                                textColor={'whiteAlpha.800'}
                                htmlFor="color">Color/Luminance</FormLabel>
                            <Input
                                id="color"
                                name="color"
                                {...register('color')}
                                placeholder={"e.g. red, bright, rich, dark, etc..."}
                                onChange={(e) => onInputChange(e, 'color')}
                            // sx={manifestationSuggestion ? {color: 'white'} : {}}

                            />
                            <SuggestionDisplay inputValue={color} suggestions={colorSuggestion} />

                        </FormControl>

                        <FormControl mb={4}>
                            <FormLabel
                                textColor={'whiteAlpha.800'}
                                htmlFor="elementType">Element/Type</FormLabel>
                            <Input
                                id="elementType"
                                name="elementType"
                                {...register('elementType')}
                                placeholder={"e.g. wood, metal, fabric, ceramic, etc..."}
                                onChange={(e) => onInputChange(e, 'elementType')}
                            // sx={manifestationSuggestion ? {color: 'white'} : {}}

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
                                textColor={'whiteAlpha.800'}

                                htmlFor="manifestation">Manifestation/Form</FormLabel>
                            <Input
                                id="manifestation"
                                name="manifestation"
                                {...register('manifestation')}
                                placeholder={"e.g. flooring, wall, tiles, counter, etc..."}
                                onChange={(e) => onInputChange(e, 'manifestation')}
                            // sx={manifestationSuggestion ? {color: 'white'} : {}}
                            />
                            <SuggestionDisplay inputValue={manifestation} suggestions={manifestationSuggestion} />

                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel

                                textColor={'whiteAlpha.800'}
                                htmlFor="condition">Condition/State</FormLabel>
                            <Input
                                id="condition"
                                name="condition"
                                {...register('condition')}
                                placeholder={"e.g. new, dusty, worn, etc..."}
                                onChange={(e) => onInputChange(e, 'condition')}
                            // sx={manifestationSuggestion ? {color: 'white'} : {}}
                            />
                            <SuggestionDisplay inputValue={condition} suggestions={conditionSuggestion} />
                        </FormControl>

                    </HStack>

                )}


                {/* Navigation Buttons; Next and Submit have diff functions based on progress state */}
                <HStack spacing={4} py={'1rem'}>

                    <Button color='white' bg={useColorModeValue('blue.800', 'purple.800')} w='full' onClick={flushFormData}>
                        Reset
                    </Button>

                    {progress > 0 && (
                        <Button color='white' bg={useColorModeValue('blue.500', 'purple.500')} w='full' onClick={() => decreaseProgress()}>
                            Back
                        </Button>
                    )}

                    {progress === 0 && (
                        <Button color='white' bg={useColorModeValue('green.400', 'green.500')} w='full' onClick={handleNext}>
                            Next
                        </Button>
                    )}
                    {progress === 1 && (
                        <Button color='white' type="submit" bg={useColorModeValue('teal.400', 'green.500')} w="full"

                            onClick={() =>
                                toast({
                                    title: 'Your Prompt Has Been Submitted! 🎉',
                                    description: "You will be redirected to the gallery page once your material is ready!",
                                    status: 'success',
                                    duration: 9000,
                                    position: 'top',
                                    variant: 'subtle',
                                    isClosable: true,
                                })
                            }
                        >
                            Submit
                        </Button>
                    )}

                </HStack>


            </Box>

        </Box>
    );
}
