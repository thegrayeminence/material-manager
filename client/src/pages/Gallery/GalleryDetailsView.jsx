import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {loadImagesFromFolder} from '../../config/loadImagesFromFolder';
import {Box, Image, SimpleGrid, Text, VStack, useColorModeValue, HStack, Heading} from '@chakra-ui/react';
import {StylishHeader} from '../../components';
import {PreviewBackgroundAnimation} from '../Preview/components';
import '@fontsource/poppins';
import '@fontsource/inter';

function GalleryDetailsView() {
    let {name} = useParams();

    const [images, setImages] = useState([]);

    useEffect(() => {
        const loadMaterial = async () => {
            const loadedImages = await loadImagesFromFolder(name);
            setImages(loadedImages);
        };

        loadMaterial();
    }, [name]);

    const imageLabels = ['Base Color', 'Normals', 'Height', 'Smoothness'];
    const formattedName = name.replace(/[_]/g, " ").toUpperCase();

    return (
        <Box width='100vw' h='100vh'>
            <VStack spacing={0} width={'100%'} overflow={'hidden'} >
                <Box position='relative' maxW='90vw' h='100%' >
                    <Text
                        fontFamily={'poppins, sans-serif'}
                        fontWeight={'800'}
                        mt='10%'
                        textAlign='center'
                        fontSize={{base: '4xl', sm: '4xl', md: '5xl', lg: '6xl', xl: '7xl'}}
                        color={'whiteAlpha.600'}>
                        {`${formattedName}`}
                    </Text>


                    <SimpleGrid
                        columns={[1, 1, 2, 2]}
                        spacing={8}
                        pt="10"
                        ml='5%'
                    >
                        {images.map((src, index) => (
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
                                <Image src={src} alt={`${name} ${imageLabels[index]}`}
                                    fit="cover" mx='auto' w='full'
                                />
                                <Text mt="3" color='whiteAlpha.600' fontSize="lg" fontFamily='avenir black, sans-serif' textAlign="center">
                                    {imageLabels[index]}
                                </Text>

                            </Box>
                        ))}
                    </SimpleGrid>
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
