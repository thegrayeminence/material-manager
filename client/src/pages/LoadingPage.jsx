import React, {useEffect, useState} from 'react';
import {Box, Heading, useToast, Text, Flex, CircularProgress, Skeleton, Image, Center, Spacer, VStack, SkeletonText, useColorModeValue, HStack} from '@chakra-ui/react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {useGeneratedImagesStore} from '../store/store';
import './LandingPage/landingPage.scss';


function BackgroundGradient() {
    return (
        <Box className="background-animation"
            height={'100vh'}
            width={'100vw'}
            position={'absolute'}
            top={0} left={0}
            zIndex={-1}
            opacity={useColorModeValue('.6', '.5')}
            backgroundBlendMode={useColorModeValue('inverse', 'overlay')}
        >
        </Box>
    )
}

const loadingMessages = [
    "Connecting to database...",
    "Storing material data and constructing prompt...",
    "Making text-to-image API call...",
    "Generating color map...",
    "Hold tight, your packets are traveling at the speed of light!",
    "Making image-to-image API call...",
    "Generating PBR maps...",
    "Encoding texture files...",
    "Transcompiling pseudo-space...",
    "Maximizing spiral energy output...",
    "Attempting to reverse entropy...",
    "Insufficient data. Re-checking request status...",
];

// const LoadingPage = () => {
export function Component() {
    const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
    const [isMinimumDisplayTimeMet, setIsMinimumDisplayTimeMet] = useState(false);
    const {promiseId, setPbrIsLoading, pbrIsLoading, setAlbedoIsLoading, albedoIsLoading, setPbrMapUrls, pbrMapUrls, setAlbedoImage, albedoImage, materialName, setMaterialName, setFileName} = useGeneratedImagesStore();
    const {id} = useParams();
    const toast = useToast();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;


    useEffect(() => {
        const generatePBRMaps = async () => {
            if (!promiseId || !albedoImage) {

                console.error("Missing data for PBR maps generation.");
                toast({
                    title: "Async Error",
                    description: "Missing data for PBR maps generation!",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                    variant: 'subtle',
                    colorScheme: 'purple',
                });
                navigate(`/gallery_id/${id}`);

                return;

            }
            setPbrIsLoading(true);
            try {
                //set necessary info about the material
                const filenameResponse = await axios.get(apiUrl + `/api/get_material_filename/${promiseId}`);
                setFileName(filenameResponse.data.filename);
                setMaterialName(filenameResponse.data.name);
                console.log(filenameResponse.data);

                // Second API call to generate PBR maps
                const pbrResponse = await axios.post(apiUrl + `/api/generate_pbr_maps`, {
                    base_color_url: albedoImage,
                    material_id: promiseId
                });
                console.log(`PBR maps generation initiated! for materialId: ${promiseId}/ name:${materialName} /baseColorUrl: ${albedoImage}`);

                setPbrMapUrls(pbrResponse.data.pbr_maps);
                console.log("PBR maps generated successfully!", pbrResponse.data.pbr_maps);
                navigate(`/gallery_id/${promiseId}`);
            } catch (error) {
                console.error("Error generating PBR maps:", error);
                toast({
                    title: 'Image-To-Image Error',
                    description: "There was a problem with the image-to-image PBR maps generation. This may take a few minutes to resolve.",
                    status: 'loading',
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                    variant: 'subtle',
                    colorScheme: 'purple',
                });
                // navigate('/gallery');
            }
            finally {
                setPbrIsLoading(false);
            }
        };
        generatePBRMaps();
    }, [promiseId, albedoImage, navigate, apiUrl, setPbrMapUrls]);
    useEffect(() => {
        const messageInterval = setInterval(() => {
            setLoadingMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
        }, 2000); // Update message every 'n' milliseconds
        const minimumDisplayTimer = setTimeout(() => {
            setIsMinimumDisplayTimeMet(true);
        }, 10000); // Set minimum display time to 'n' milliseconds
        return () => {
            clearInterval(messageInterval);
            clearTimeout(minimumDisplayTimer);
        };
    }, [loadingMessages.length]);
    useEffect(() => {
        if (isMinimumDisplayTimeMet && !pbrIsLoading) {
            navigate(`/gallery_id/${promiseId}`);
            return;
        }
    }, [isMinimumDisplayTimeMet, pbrIsLoading, navigate, promiseId]);


    return (
        <Box width='100vw' h='100vh'
            opacity={'99.9%'} position='relative' overflow={'hidden'}
        >
            <Center>
                <Box maxW="80vw" mx="auto">

                    <VStack spacing={8} >
                        <Box mt='7.5rem' pt={'100px'} >
                            <Center flexDirection={'column'}>


                                <Heading fontSize={{base: '2xl', sm: 'xl', md: '2xl', lg: '3xl', xl: '4xl'}} textAlign={'center'} color='white'>
                                    {`Loading '${materialName}'...`}
                                </Heading>
                                <Spacer py={'75px'} />

                                <CircularProgress zIndex={4} isIndeterminate color={useColorModeValue('teal.300', 'purple.300')} size={{base: '3rem', sm: '3.5rem', md: '5rem', lg: '6.5rem', xl: '8rem'}} />
                                <Spacer py={'75px'} />
                                <Text fontSize={{base: 'xl', sm: 'xl', md: '2xl', lg: '3xl', xl: '4xl'}} color='white'
                                    textAlign={'center'}>
                                    {loadingMessages[loadingMessageIndex]}
                                </Text>
                                {/* <Spacer py={'2.5rem'} /> */}
                            </Center>
                        </Box>

                    </VStack>

                    <VStack spacing={8} >

                        <Box position='absolute' top={'200px'} mt='7.5rem'>

                            <Center flexDirection={'column'}>

                                <Skeleton boxShadow='xl' boxSize={{base: '250px', sm: '225px', md: '250px', lg: '280px', xl: '300px'}} isLoaded={albedoImage}>
                                    {albedoImage && (

                                        <Box align={'center'} justify='center' boxShadow="xl" borderRadius="md" overflow="hidden" border="1px solid" borderColor="gray.400" bg="whiteAlpha.200" >
                                            <Text mt="1" color='whiteAlpha.700' fontWeight={'500'} fontSize={{base: 'lg', sm: 'md', md: 'lg', lg: 'lg', xl: 'xl'}} fontFamily='avenir, sans-serif' textAlign="center" >
                                                Base Color Map:
                                            </Text>
                                            <Image boxSize={{base: '225px', sm: '215px', md: '225px', lg: '275px', xl: '300px'}} objectFit="cover" src={albedoImage} alt="Albedo Image" />
                                        </Box>
                                    )}
                                </Skeleton>
                            </Center>
                        </Box>
                    </VStack>

                </Box>
            </Center>
            <Box
                height={'100vh'} width={'100vw'} position={'absolute'}
                top={0} left={0} zIndex={-1} bg={useColorModeValue('facebook.600', 'indigo')}
            >
                <BackgroundGradient />
            </Box>
            <Spacer h='80px' />
        </Box >
    );
};

Component.displayName = "LoadingPage";
