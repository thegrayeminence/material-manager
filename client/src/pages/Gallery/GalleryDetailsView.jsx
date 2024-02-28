import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Box, Image, Spacer, SimpleGrid, Select, Button, Text, VStack, useToast, Skeleton, SkeletonText, useColorModeValue, HStack, Heading, Center, } from '@chakra-ui/react';
import {PreviewBackgroundAnimation} from '../Preview/components';
import {PBROnePreviewBox} from './components';
import '@fontsource/poppins';
import '@fontsource/inter';
import axios from 'axios';
import JSZip, {folder} from 'jszip';
import {saveAs} from 'file-saver';
import '../LandingPage/landingPage.scss'
import {SimpleFooter} from '../../components';
import {set} from 'react-hook-form';


function GradientBackground() {
    return (
        <Box className="background-animation"
            height={'100vh'}
            width={'100vw'}
            position={'absolute'}
            top={0} left={0}
            zIndex={0}
            opacity={useColorModeValue('.2', '.2')}
            backgroundBlendMode={useColorModeValue('luminosity', 'overlay')}
        >
        </Box>
    )
}

function GalleryDetailsView() {
    let {name} = useParams();
    const [images, setImages] = useState([]);
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [imageUrls, setImageUrls] = useState([]);
    const [roughnessUrl, setRoughnessUrl] = useState([]);

    //functionality for getting image urls/data from backend
    useEffect(() => {
        const loadStaticImage = async (folderName) => {
            setIsLoading(true);
            try {
                const apiUrl = import.meta.env.VITE_API_URL;
                const response = await axios.get(apiUrl + `/api/images/${folderName}`);
                const urls = response.data.image_urls
                const urlsFilteredNoRoughness = urls.filter(url => !url.includes('roughness'));
                setImageUrls(urlsFilteredNoRoughness);
                setImages(urlsFilteredNoRoughness);
                setRoughnessUrl(response.data.roughness);
                const folder = response.data.material_name;
                console.log("static image load response:", response.data, "urls:", response.data.image_urls, "folder:", folder);
            } catch (error) {
                console.error("Failed to load static images:", error);
            }
            finally {
                setIsLoading(false);
            }
        };
        loadStaticImage(name);
    }, [name]);


    //functionality for downloading/zipping images via urls from loadsStaticImage
    const fetchImageAsBlob = async (url) => {
        const response = await axios.get(url, {responseType: 'blob'});
        return response.data;
    };

    const handleDownloadZip = async () => {
        if (imageUrls.length === 0) {
            console.error("No images to download");
            return;
        }
        const zip = new JSZip();
        for (const imageUrl of imageUrls) {
            const imageName = imageUrl.split('/').pop();
            try {
                const imageBlob = await fetchImageAsBlob(imageUrl);
                zip.file(imageName, imageBlob, {binary: true});
            } catch (error) {
                console.error(`Failed to fetch image ${imageName}:`, error);
            }
        }
        zip.generateAsync({type: "blob"})
            .then((content) => {
                saveAs(content, `${name}.zip`);
            })
            .catch((error) => {
                console.error('Failed to generate zip:', error);
            });
    };


    const imageLabels = ['Base Color', 'Height', 'Normals', 'Smoothness'];
    const displayName = name.replace(/[_]/g, " ").toUpperCase();

    return (
        <Box width='100vw' h='100vh' opacity='.99' position='relative'>
            <VStack spacing={0} width={'100%'} overflow={'hidden'} >
                <Box position='relative' maxW='85vw' h='100%' mt='5%'>
                    <Text
                        fontFamily={'poppins black, sans-serif'}
                        fontWeight={'800'}
                        textAlign='center'
                        fontSize={{base: '3xl', sm: '2xl', md: '4xl', lg: '5xl', xl: '6xl'}}
                        color={useColorModeValue('teal.600', 'purple.600')}
                        opacity={0.9}
                    >
                        {`${displayName}`}
                    </Text>
                    <Text
                        fontFamily={'poppins, sans-serif'}
                        fontWeight={'600'}
                        pt={'10'}
                        textAlign='center'
                        fontSize={{base: 'xl', sm: 'xl', md: '2xl', lg: '4xl', xl: '5xl'}}
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
                                p={{base: 4, sm: 3, md: 4, lg: 5, xl: 6}}
                                borderWidth="2px"
                                borderColor={'whiteAlpha.400'}
                                boxShadow={'xl'}
                                bg={useColorModeValue('whiteAlpha.300', 'blackAlpha.400')}
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
                                bg={useColorModeValue('whiteAlpha.200', 'blackAlpha.400')}

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
                                onClick={handleDownloadZip}
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
                            !isLoading && <PBROnePreviewBox images={images} roughness={roughnessUrl} />
                        }
                    </Box>
                </Box >
            </VStack>
            <Box width={'100vw'} height={'100%'} margin={0} padding={0} position={'fixed'} top={0} left={0}
                zIndex={-1}>
                <PreviewBackgroundAnimation />
                <GradientBackground />
            </Box>
            <Spacer height={'250px'} />
            <SimpleFooter />
            <Spacer height={'10px'} />
        </Box>
    );
}

export default GalleryDetailsView;