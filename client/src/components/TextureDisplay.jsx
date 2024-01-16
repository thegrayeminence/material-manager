import React, {useEffect} from 'react';
import axios from 'axios';
import {useMaterialStore, useIsLoadingStore, useGeneratedImagesStore} from '../store/store';
import {Box, SimpleGrid, Spinner, Center, useToast, Image} from '@chakra-ui/react';
import {motion} from 'framer-motion';

const MotionImageBox = motion(Box);

const TextureDisplay = () => {
    const {generatedImages, setGeneratedImages} = useGeneratedImagesStore();
    const {isLoading, setIsLoading} = useIsLoadingStore();
    const toast = useToast();

    useEffect(() => {
        setIsLoading(true);
        axios.get('http://localhost:3001/api/get_recent_maps')
            .then(response => {
                setGeneratedImages(response.data.image_urls);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching texture images:', error);
                setIsLoading(false);
                toast({
                    title: "Error loading textures",
                    description: error.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            });
    }, [setGeneratedImages, setIsLoading, toast]);

    return (
        <Box>
            {isLoading ? (
                <Center><Spinner size="xl" /></Center>
            ) : (
                generatedImages.length > 0 && (
                    <SimpleGrid columns={[2, null, 3]} spacing="40px" p={5}>
                        {generatedImages.map((url, index) => (
                            <MotionImageBox
                                key={index}
                                whileHover={{scale: 1.05}}
                                boxShadow="md"
                                borderRadius="lg"
                                overflow="hidden"
                            >
                                <Image src={url} alt={`Texture ${index + 1}`} boxSize="300px" objectFit="cover" />
                            </MotionImageBox>
                        ))}
                    </SimpleGrid>
                )
            )}
        </Box>
    );
};

export default TextureDisplay;