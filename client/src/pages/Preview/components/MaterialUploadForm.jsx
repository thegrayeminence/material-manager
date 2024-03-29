import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useForm, Controller, set} from 'react-hook-form';
import {DevTool} from '@hookform/devtools';
import axios from 'axios';
import {
    Box, Button, VStack, FormControl, FormLabel, Image, Input, Textarea, Text,
    HStack, useBoolean, useTheme, useColorModeValue, FormErrorMessage,
    useToast, AlertIcon, AlertTitle, AlertDescription, CloseButton, useDisclosure, CircularProgress, Spinner, Spacer
} from '@chakra-ui/react';

import {Select} from "chakra-react-select";

//local imports
import {textureMapOptionsPBRMetalRough, textureMapOptionsPBRGlossSpec, textureMapOptionsCommon, materialTypeOptions, metaDataOptions} from '../../../config/formInputData';
import {useMaterialStore, useProgressStore, useAutosuggestionStore, useGeneratedImagesStore} from '../../../store/store';
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
    // const {isLoading, setIsLoading} = useIsLoadingStore();
    const [isLoading, setIsLoading] = useState(false);
    const {clearImages, setAlbedoIsLoading, albedoIsLoading, setPromiseId, setAlbedoImage, setPBRImage, setMaterialName} = useGeneratedImagesStore();

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
    // axios.defaults.withCredentials = true;

    const handleFormSubmission = async (data) => {

        // if (!color || !elementType || !manifestation || !condition) {
        //     toast({
        //         title: "Validation Error",
        //         description: "Please fill in all required fields.",
        //         status: "error",
        //         duration: 5000,
        //         isClosable: true,
        //         position: "top",
        //         variant: 'subtle',
        //         colorScheme: 'purple',

        //     });
        //     return;
        // };

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
        };

        // clearImages();
        setIsLoading(true);
        setAlbedoIsLoading(true);
        increaseProgress();
        toast({
            title: 'Form Submitted Successfully!',
            description: "Please wait while we initiate the image generation process! This may take a few moments.",
            status: 'success',
            duration: 5000,
            position: 'top',
            isClosable: true,

        });


        try {



            const materialData = {...formData.materialData, ...data};
            const apiUrl = import.meta.env.VITE_API_URL
            console.log('logging form data!:', {'formdata': formData, 'materialData': materialData, 'apiUrl': apiUrl});


            const textureResponse = await axios.post(apiUrl + "/api/generate_albedo",
                {materialData: data}
            );
            console.log("Albedo texture generation initiated!");


            const materialId = textureResponse.data.material_id;
            const baseColorUrl = textureResponse.data.base_color_url;
            // const name = textureResponse.data.material_name;
            setPromiseId(materialId);
            setAlbedoImage(baseColorUrl);
            // setMaterialName(name);
            console.log(`Albedo ID ${materialId} url ${baseColorUrl} added to store `);

            // Navigate to the loading page with materialId
            navigate(`/loading/${materialId}`);

        } catch (error) {
            console.error("Error during form submission:", error);
            toast({
                title: 'Error',
                description: "There was a problem with the submission. Please try again.",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top',
                variant: 'subtle',
                colorScheme: 'red',
            });
        } finally {
            setIsLoading(false);
            setAlbedoIsLoading(false);
            resetProgress();
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
            if (!color || !elementType || !manifestation || !condition) {
                toast({
                    title: "Validation Error",
                    description: "Please fill in all required fields.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                    variant: 'subtle',
                    colorScheme: 'purple',

                });
                return;
            };

            increaseProgress();
        }
        // else if (progress === 1) {
        //     if (!color || !elementType || !manifestation || !condition) {
        //         toast({
        //             title: "Validation Error",
        //             description: "Please fill in all required fields.",
        //             status: "error",
        //             duration: 5000,
        //             isClosable: true,
        //             position: "top",

        //         });
        //         return;
        //     }
        //     increaseProgress();
        // }
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
                {progress === 1 && (
                    <FormControl mb={4} textColor='gray.500' isInvalid={errors.materialType}>
                        <FormLabel
                            textColor={'whiteAlpha.800'}

                            htmlFor="materialType">Material Type</FormLabel>
                        <Controller
                            name="materialType"

                            control={control}
                            // rules={progress === 1 ? {required: "Material Type is required"} : {}}
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
                {progress === 1 && (
                    <FormControl textColor='gray.500' mb={4} isInvalid={errors.materialTextures}>
                        <FormLabel
                            textColor={'whiteAlpha.800'}

                            htmlFor="materialTextures">Texture Maps</FormLabel>
                        <Controller
                            name="materialTextures"
                            control={control}
                            // rules={progress === 1 ? {required: "Material Textures are required"} : {}}
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
                {progress === 1 && (
                    <FormControl textColor='gray.500' mb={4}>
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
                {progress === 0 && (
                    <HStack spacing={4} py={'.5rem'}>
                        <FormControl mb={4}>
                            <FormLabel
                                textColor={'whiteAlpha.800'}
                                htmlFor="color">{`Prefix 1`}</FormLabel>
                            <Input
                                id="color"
                                name="color"
                                {...register('color')}
                                placeholder={"e.g. oak, steel, silk, white, alien, etc..."}
                                onChange={(e) => onInputChange(e, 'color')}
                            // sx={manifestationSuggestion ? {color: 'white'} : {}}

                            />
                            <SuggestionDisplay inputValue={color} suggestions={colorSuggestion} />

                        </FormControl>

                        <FormControl mb={4}>
                            <FormLabel
                                textColor={'whiteAlpha.800'}
                                htmlFor="elementType">{`Category`}</FormLabel>
                            <Input
                                id="elementType"
                                name="elementType"
                                {...register('elementType')}
                                placeholder={"e.g. wood, metal, fabric, ceramic, rock, etc..."}
                                onChange={(e) => onInputChange(e, 'elementType')}
                            // sx={manifestationSuggestion ? {color: 'white'} : {}}

                            />
                            <SuggestionDisplay inputValue={elementType} suggestions={elementTypeSuggestion} />

                        </FormControl>
                    </HStack>
                )}


                {/* Additional Form Controls for Material Physical Attributes: Row2 */}
                {progress === 0 && (
                    <HStack spacing={4} py={'.5rem'}>
                        <FormControl mb={4}>
                            <FormLabel
                                textColor={'whiteAlpha.800'}

                                htmlFor="manifestation">{`Prefix 2`}</FormLabel>
                            <Input
                                id="manifestation"
                                name="manifestation"
                                {...register('manifestation')}
                                placeholder={"e.g. mossy, rusted, ancient, worn, etc..."}
                                onChange={(e) => onInputChange(e, 'manifestation')}
                            // sx={manifestationSuggestion ? {color: 'white'} : {}}
                            />
                            <SuggestionDisplay inputValue={manifestation} suggestions={manifestationSuggestion} />

                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel

                                textColor={'whiteAlpha.800'}
                                htmlFor="condition">{`Object`}</FormLabel>
                            <Input
                                id="condition"
                                name="condition"
                                {...register('condition')}
                                placeholder={"e.g. flooring, wall, tiles, ground, etc..."}
                                onChange={(e) => onInputChange(e, 'condition')}
                            // sx={manifestationSuggestion ? {color: 'white'} : {}}
                            />
                            <SuggestionDisplay inputValue={condition} suggestions={conditionSuggestion} />
                        </FormControl>

                    </HStack>

                )}

                {progress === 2 && (
                    <VStack spacing={6} py={'.5rem'}>
                        <>
                            <Spacer py='.25rem' />
                            <Spinner
                                thickness={{base: '4px', sm: '3px', md: '4px', lg: '6px', xl: '8px'}}
                                speed='0.65s'
                                emptyColor='gray.200'
                                color={useColorModeValue('teal.300', 'purple.300')}
                                boxSize={{base: '3rem', sm: '2.5rem', md: '3rem', lg: '4rem', xl: '6rem'}}

                            />
                            <Spacer py='.25rem' />
                            <Text textColor={'whiteAlpha.800'} fontSize={{base: 'lg', sm: 'md', md: 'lg', lg: 'xl', xl: '2xl'}} textAlign={'center'}>
                                {`Your prompt is being processed! Please give the server a few moments to generate the first texture map...`}
                            </Text>
                            <Spacer py='.25rem' />
                        </>
                    </VStack>
                )}


                {/* Navigation Buttons; Next and Submit have diff functions based on progress state */}
                <HStack spacing={4} py={'1rem'}>

                    <Button color='white' bg={useColorModeValue('twitter.700', 'purple.800')} w='full' onClick={flushFormData}>
                        Reset
                    </Button>

                    {0 > progress > 2 && (
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
                        <Button color='white'
                            bg='green.500'
                            // bg={useColorModeValue('teal.400', 'green.500')} 
                            w="full"
                            type="submit"

                        >
                            Submit
                        </Button>
                    )}


                </HStack>


            </Box>

        </Box>
    );
}