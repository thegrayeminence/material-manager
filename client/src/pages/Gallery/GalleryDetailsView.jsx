import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Box, Image, Flex, Spacer, SimpleGrid, Grid, Select, Button, Text, VStack, useToast, Skeleton, SkeletonText, useColorModeValue, HStack, Heading, Center, Container, GridItem} from '@chakra-ui/react';
import {PreviewBackgroundAnimation} from '../Preview/components';
import {PBROnePreviewBox} from './components';
import '@fontsource/poppins';
import '@fontsource/inter';
import axios from 'axios';
import JSZip, {folder} from 'jszip';
import {saveAs} from 'file-saver';
import '../LandingPage/landingPage.scss'


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

// function GalleryDetailsView() {
export function Component() {
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
        <Box width='100vw' h='100%' opacity='.99' position='relative'>
            <VStack width={'full'} overflow={'hidden'}>
                <Box position='relative' maxW='90vw' h='100%' mt='80px' mx='auto'>
                    <Container centerContent >
                        <Text
                            fontFamily={'poppins black, sans-serif'}
                            fontWeight={'800'}
                            textAlign='center'
                            fontSize={{base: '3xl', sm: '2xl', md: '3xl', lg: '4xl', xl: '5xl'}}
                            color={useColorModeValue('teal.600', 'purple.600')}
                            opacity={0.99}
                            noOfLines={[3, 3, 2, 2]}
                            letterSpacing={'wide'}
                            whiteSpace={'pretty'}



                        >
                            {`${displayName}`}
                        </Text>
                        <Text
                            fontFamily={'poppins, sans-serif'}
                            fontWeight={'600'}
                            py={'6'}
                            textAlign='center'
                            noOfLines={1}
                            fontSize={{base: 'xl', sm: 'xl', md: '2xl', lg: '4xl', xl: '5xl'}}
                            color={'whiteAlpha.600'}>
                            {`TEXTURE FILES:`}
                        </Text>

                    </Container>


                    <Grid
                        // columns={[1, 2, 2, 4]}
                        // spacing={8}
                        templateColumns={{base: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)', xl: 'repeat(4, 1fr)'}}
                        gap={[4, 4, 6, 8]}
                    >
                        {!isLoading && images.map((src, index) => (

                            <GridItem key={index}
                                py={['.2rem', '.3rem', '.35rem']}
                                px={['.05rem', '.1rem', '.15rem']}
                                borderWidth={['.1rem', '.15rem', '.2rem', '.3rem']}
                                borderColor={useColorModeValue('blackAlpha.200', 'whiteAlpha.200')}
                                borderStyle='ridge'
                                boxShadow={'base'}
                                bg={useColorModeValue('whiteAlpha.300', 'blackAlpha.400')}
                                borderRadius="lg"
                                overflow="hidden"
                                backdropFilter="blur(10px)"
                            >


                                <Image src={src} alt={`${name} ${imageLabels[index]}`}
                                    fit='cover'
                                    borderWidth='.05rem'
                                    borderColor='whiteAlpha.400'
                                    borderStyle='solid'
                                    borderRadius={'md'}
                                />
                                <Text mt="1"
                                    fontWeight={'500'}

                                    color='whiteAlpha.600'
                                    fontSize={['md', 'lg', 'xl', '2xl']}
                                    fontFamily='poppins, sans-serif'
                                    textAlign="center">
                                    {imageLabels[index]}
                                </Text>
                            </GridItem>
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
                    </Grid>
                    {!isLoading && (
                        <Center>
                            <Button
                                bgGradient={useColorModeValue('linear(to-r, teal.400,green.400)', 'linear(to-r, purple.500, blue.500)')}
                                _active={{transform: 'scale(1.15)'}}
                                _hover={{transform: 'scale(1.05)', bg: "<color>", textColor: 'white', bgGradient: useColorModeValue('linear(to-r, purple.600,blue.600)', 'linear(to-r, teal.300, green.300)')}}
                                variant="solid"
                                textColor={'whiteAlpha.800'}
                                mt={5}
                                width={'10rem'}
                                height='3.3rem'
                                fontWeight={'bold'}
                                letterSpacing={'wide'}
                                boxShadow={'base'}
                                borderRadius={'lg'}
                                fontSize={['md', 'lg', 'xl']}
                                onClick={handleDownloadZip}
                            >
                                DOWNLOAD
                            </Button>
                        </Center>
                    )}
                    <Spacer py={2} />

                    <Flex
                        direction="column"
                        align="center"
                    >
                        <Text
                            fontFamily={'poppins, sans-serif'}
                            fontWeight={'600'}
                            letterSpacing={'wide'}
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
                    </Flex>
                </Box >
            </VStack>
            <Box width={'100vw'} height={'100%'} margin={0} padding={0} position={'fixed'} top={0} left={0}
                zIndex={-1}>
                <PreviewBackgroundAnimation />
                <GradientBackground />
            </Box>
            <Spacer h='60px' />
        </Box>
    );
}

// export default GalleryDetailsView;
Component.displayName = "GalleryDetailsView";