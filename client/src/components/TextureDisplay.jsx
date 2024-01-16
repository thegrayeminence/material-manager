import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useMaterialStore} from '../store/store';
import {Box, Image, SimpleGrid, Spinner, Center, useToast} from '@chakra-ui/react';

const TextureDisplay = () => {
    const {generatedImages, setGeneratedImages} = useMaterialStore();
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    useEffect(() => {
        if (generatedImages.length === 0 || !generatedImages.length) {
            setIsLoading(true);
            axios.get('http://localhost:3001/api/get_generated_textures')
                .then(response => {
                    setGeneratedImages(response.data.image_urls);
                    toast({
                        title: "Textures loaded successfully",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                    });
                })
                .catch(error => {
                    console.error('Error fetching texture images:', error);
                    toast({
                        title: "Error loading textures",
                        description: error.message,
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                })
                .finally(() => setIsLoading(false));
        }
    }, [setGeneratedImages, toast]);

    return (
        <Box>
            {isLoading ? (
                <Center><Spinner size="xl" /></Center>
            ) : (
                generatedImages.length > 0 && (
                    <SimpleGrid columns={[2, null, 3]} spacing="40px">
                        {generatedImages.map((url, index) => (
                            <Image key={index} src={url} alt={`Texture ${index + 1}`} boxSize="300px" objectFit="cover" />
                        ))}
                    </SimpleGrid>
                )
            )}
        </Box>
    );
};

export default TextureDisplay;
