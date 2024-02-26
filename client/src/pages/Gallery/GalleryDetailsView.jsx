import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {loadImagesFromFolder} from '../../config/loadImagesFromFolder';
import {Box, Image, Spacer, SimpleGrid, Select, Button, Text, VStack, useToast, Skeleton, SkeletonText, useColorModeValue, HStack, Heading, Center, } from '@chakra-ui/react';
import {StylishHeader} from '../../components';
import {PreviewBackgroundAnimation} from '../Preview/components';
import {PBROnePreviewBox} from './components';
import '@fontsource/poppins';
import '@fontsource/inter';
import axios from 'axios';
import {set} from 'react-hook-form';

function GalleryDetailsView() {
    let {name} = useParams();
    const [images, setImages] = useState([]);
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [materialName, setMaterialName] = useState(name);


    const handleDownload = async (materialName) => {



        try {
            const apiUrl = import.meta.env.VITE_API_URL
            const materialZip = materialName + '.zip'
            console.log("handle download for:", materialZip, "apiUrl:", apiUrl)


            const response = await axios.get(apiUrl + `/api/download_static_material/${materialName}`, {
                responseType: 'blob',
            });
            console.log("response:", response)
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', materialZip);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error("Error downloading material:", error);

        }
    };

    // testing new endpoint for backend static image assets

    // useEffect(() => {
    //     const loadMaterialTextures = async () => {

    //         // const requestUrl = `${import.meta.env.VITE_STATIC_URL}assets/images/${name}`; // Construct the URL to fetch images from the specific folder
    //         // console.log("backend response: \n folderUrl:", requestUrl, "\n folderName:", `${name}`)

    //         try {
    //             setisLoadingBackend(true);
    //             const response = await axios.get(`${import.meta.env.VITE_STATIC_URL}assets/images/${name}`);
    //             const image_urls = response.data;

    //             setbackendImages(image_urls);
    //             console.log("response:", response, "response.data:", response.data)
    //             setisLoadingBackend(false);

    //         } catch (error) {
    //             console.error("Failed to load texture images:", error);
    //         }
    //     };

    //     loadMaterialTextures();
    // }, [name]);


    //old way of loading images from public folder on frontend
    useEffect(() => {
        const loadMaterial = async () => {
            setIsLoading(true);
            const loadedImages = await loadImagesFromFolder(name);
            console.log("loadedImages frontend src:", loadedImages, "folder name:", name)
            setImages(loadedImages);
            setIsLoading(false);
        };

        loadMaterial();
    }, [name]);

    const imageLabels = ['Base Color', 'Normals', 'Height', 'Smoothness'];
    // const textureTypes = ['base_color', '_normal', '_height', 'smoothness'];
    const displayName = name.replace(/[_]/g, " ").toUpperCase();
    // console.table("backend images length", backendImages.length, "backend images:", backendImages, "frontend images length", images.length, "frontend images:", images, "isLoading:", isLoading, "isLoadingBackend:", isLoadingBackend)

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

                        {`${displayName}`}
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
                            <Button colorScheme={'blue'}
                                variant="outline" mt={5} size={{base: 'md', sm: 'md', md: 'md', lg: 'lg', xl: 'lg'}}
                                // onClick={() =>
                                //     toast({
                                //         title: 'Downloads of community/static files not currently available!',
                                //         description: "Server undergoing maintanenance — try generating new images for downloading via the form...or check back here later!",
                                //         status: 'error',
                                //         duration: 8000,
                                //         position: 'top',
                                //         // variant: 'subtle',
                                //         isClosable: true,
                                //         colorScheme: 'purple',
                                //     })
                                // }
                                onClick={() => handleDownload(materialName)}

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