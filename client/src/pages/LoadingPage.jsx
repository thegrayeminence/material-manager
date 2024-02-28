import React, {useEffect, useState} from 'react';
import {Box, Heading, useToast, Text, Flex, CircularProgress, Center, Spacer, VStack, useColorModeValue} from '@chakra-ui/react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {motion} from 'framer-motion';
import {useGeneratedImagesStore} from '../store/store';
import {ParticlesBGAnimation} from '../components';


const MotionImageBox = motion(Box);

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

const LoadingPage = () => {

    const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
    const [isMinimumDisplayTimeMet, setIsMinimumDisplayTimeMet] = useState(false);

    const {promiseId, setPbrIsLoading, pbrIsLoading, setAlbedoIsLoading, albedoIsLoading, setPbrMapUrls, pbrMapUrls, albedoImage} = useGeneratedImagesStore();
    const {id} = useParams();
    const toast = useToast();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    // const fetchAlbedoById = async () => {
    //     try {
    //         const response = await axios.get(`/api/get_albedo_by_id/${id}`);
    //         setAkb(response.data.base_color_url);
    //         loadPBRMaps(response.data.material_id);
    //     } catch (error) {
    //         console.error('Error fetching recent albedo:', error);
    //     }
    // };

    /*
    useEffect(() => {
        const generatePBRMaps = async () => {
            if (!promiseId || !albedoImage) {
                console.error("Missing data for PBR maps generation.");
                toast({
                    title: "Async Error",
                    description: "Missing data for PBR maps generation, redirecting to gallery...",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                    variant: 'subtle',
                    colorScheme: 'purple',

                });
                navigate('/gallery');
                return;
            }
            setPbrIsLoading(true);
            try {

                // Second API call to generate PBR maps
                const pbrResponse = await axios.post(apiUrl + `/api/generate_pbr_maps`, {
                    base_color_url: albedoImage,
                    material_id: promiseId
                });
                console.log(`PBR maps generation initiated! for materialId: ${promiseId} and baseColorUrl: ${albedoImage}`);

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

*/


    useEffect(() => {
        const messageInterval = setInterval(() => {
            setLoadingMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
        }, 2000); // Update message every 'n' milliseconds

        /*
        const minimumDisplayTimer = setTimeout(() => {
            setIsMinimumDisplayTimeMet(true);
        }, 10000); // Set minimum display time to 'n' milliseconds

        return () => {
            clearInterval(messageInterval);
            clearTimeout(minimumDisplayTimer);
        };
        */
    }, [loadingMessages.length]);

    /*
    useEffect(() => {
        if (isMinimumDisplayTimeMet && !pbrIsLoading) {
            // Navigate to the next page once both conditions are met
            navigate(`/gallery_id/${promiseId}`);
        }
    }, [isMinimumDisplayTimeMet, pbrIsLoading, navigate, promiseId]);
*/


    return (
        <Box width='100vw' h='100vh'
            opacity={'99.9%'}
        >
            <Box maxW="7xl" mx="auto" height="100vh">

                <Box position='relative' mt={'25%'}>
                    <VStack spacing={8}>
                        <Heading fontSize={{base: '2xl', sm: '2xl', md: '3xl', lg: '4xl', xl: '5xl'}} textAlign={'center'}>
                            Loading PBR Maps...
                        </Heading>
                        <Spacer py={2} />
                        <CircularProgress isIndeterminate color={useColorModeValue('teal.300', 'purple.300')} size={{base: '3rem', sm: '3.5rem', md: '5rem', lg: '6.5rem', xl: '8rem'}} />
                        <Spacer py={2} />
                        <Text fontSize={{base: 'xl', sm: 'xl', md: '2xl', lg: '3xl', xl: '4xl'}}
                            textAlign={'center'}>
                            {loadingMessages[loadingMessageIndex]}
                        </Text>
                    </VStack>
                </Box>
            </Box>
            <Box
                height={'100vh'} width={'100vw'} position={'absolute'}
                top={0} left={0} zIndex={-1}
            >
                <ParticlesBGAnimation />
            </Box>
        </Box>

    );
};

export default LoadingPage;

