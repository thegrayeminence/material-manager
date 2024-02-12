import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {loadImagesFromFolder} from '../../config/loadImagesFromFolder';
import {Box, Image, Spacer, SimpleGrid, Select, Button, Text, VStack, useToast, Skeleton, SkeletonText, useColorModeValue, HStack, Heading, Center, } from '@chakra-ui/react';
import {StylishHeader} from '../../components';
import {PreviewBackgroundAnimation} from '../Preview/components';
import {PBROnePreviewBox} from './components';
import '@fontsource/poppins';
import '@fontsource/inter';

function GalleryDetailsView() {
    let {name} = useParams();
    const toast = useToast();
    const [images, setImages] = useState([]);
    const [backendImages, setbackendImages] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingBackend, setisLoadingBackend] = useState(true);

    // testing new endpoint for backend static image assets

    useEffect(() => {
        const loadMaterialTextures = async () => {
            setisLoadingBackend(true);
            // Use the environment variable VITE_API_URL to construct the request URL

            const folderUrl = `${import.meta.env.VITE_API_URL}assets/images/${name}/`; // Construct the URL to fetch images from the specific folder
            console.log("backend response: \n folderUrl:", folderUrl)
            console.log("backend response: \n apiUrl:", VITE_API_URL)
            console.log("backend response: \n folderName:", `${name}`)
            try {
                const response = await fetch(folderUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const imageUrls = await response.json(); // Expecting the response to be a JSON array of image URLs
                console.log("backend response: \n imageUrls:", imageUrls)
                setbackendImages(imageUrls);
            } catch (error) {
                console.error("Failed to load texture images:", error);
                // toast({
                //     title: 'Error loading texture files',
                //     description: error.message,
                //     status: 'error',
                //     duration: 5000,
                //     isClosable: true,
                // });
            }
            finally {
                setisLoadingBackend(false);
            }
        };

        loadMaterialTextures();
    }, [name]);


    //old way of loading images from public folder on frontend
    useEffect(() => {
        const loadMaterial = async () => {
            setIsLoading(true);
            const loadedImages = await loadImagesFromFolder(name);
            console.log("loadedImages frontend src:", loadedImages)
            setImages(loadedImages);
            setIsLoading(false);
        };

        loadMaterial();
    }, [name]);

    const imageLabels = ['Base Color', 'Normals', 'Height', 'Smoothness'];
    const formattedName = name.replace(/[_]/g, " ").toUpperCase();
    // console.log("images length", images.length)

    return (
        <Box width='100vw' h='100vh' opacity='.99'>
            <VStack spacing={0} width={'100%'} overflow={'hidden'} >
                <Box position='relative' maxW='85vw' h='100%' >
                    <Text
                        fontFamily={'poppins, sans-serif'}
                        fontWeight={'800'}
                        mt='10%'
                        textAlign='center'
                        fontSize={{base: '4xl', sm: '4xl', md: '5xl', lg: '6xl', xl: '7xl'}}
                        color={useColorModeValue('teal.600', 'purple.600')}
                        opacity={0.75}
                    >

                        {`${formattedName}`}
                    </Text>
                    <Text
                        fontFamily={'poppins, sans-serif'}
                        fontWeight={'600'}
                        pt={'10'}
                        textAlign='center'
                        fontSize={{base: '2xl', sm: '2xl', md: '3xl', lg: '4xl', xl: '6xl'}}
                        color={'whiteAlpha.600'}>
                        {`TEXTURE FILES:`}
                    </Text>

                    <SimpleGrid
                        columns={[2, 2, 2, 4]}
                        spacing={8}
                        pt={'2'}
                        ml='5%'
                    >
                        {!isLoading && images.map((src, index) => (
                            <Box key={index}
                                p={{base: 5, sm: 4, md: 5, lg: 6, xl: 8}}
                                borderWidth="2px"
                                borderColor={'whiteAlpha.400'}
                                boxShadow={'xl'}
                                bg={'blackAlpha.400'}
                                borderRadius="lg"
                                overflow="hidden"
                                backdropFilter="blur(10px)"

                            >
                                <Image src={src} alt={`${name} ${imageLabels[index]}`}
                                    fit="cover" mx='auto' w='full'
                                />
                                <Text mt="3" color='whiteAlpha.600' fontSize="lg" fontFamily='avenir black, sans-serif' textAlign="center">
                                    {imageLabels[index]}
                                </Text>

                            </Box>
                        ))}
                        {isLoading && [1, 2, 3, 4].map((_, index) => (
                            <Box key={index}
                                p={{base: 8, sm: 5, md: 8, lg: 8, xl: 10}}
                                borderWidth="2px"
                                borderColor={'whiteAlpha.400'}
                                boxShadow={'xl'}
                                bg={'blackAlpha.400'}
                                borderRadius="lg"
                                overflow="hidden"
                                backdropFilter="blur(10px)"

                            >
                                <Skeleton width='100%' h={['200px', '250px', '300px', '350px']} />
                                <SkeletonText mt="3" noOfLines={1} spacing="4" />
                            </Box>
                        ))}

                    </SimpleGrid>
                    {!isLoading && (
                        <Center>
                            <Button colorScheme={useColorModeValue('purple', 'blue')}
                                variant="outline" mt={5} size={{base: 'md', sm: 'md', md: 'md', lg: 'lg', xl: 'lg'}}
                            >
                                DOWNLOAD
                            </Button>
                        </Center>
                    )}

                    <Spacer py={1} />
                    <Box position='relative' w='80%' h='100%' mx='auto'>
                        <Text
                            fontFamily={'poppins, sans-serif'}
                            fontWeight={'600'}
                            mt='2.5%'
                            textAlign='center'
                            fontSize={{base: '2xl', sm: '2xl', md: '3xl', lg: '4xl', xl: '6xl'}}
                            color={'whiteAlpha.600'}
                        >
                            {`LIVE PREVIEW:`}
                        </Text>

                        {
                            !isLoading && <PBROnePreviewBox images={images} />
                        }
                    </Box>

                </Box >

            </VStack>
            <Box width={'100vw'} height={'100%'} margin={0} padding={0} position={'fixed'} top={0} left={0}
                zIndex={-1}>
                <PreviewBackgroundAnimation />
            </Box>
        </Box>
    );
}

export default GalleryDetailsView;
