import React, {useEffect} from 'react';
import axios from 'axios';
import {useMaterialStore} from '../store/store';
import {Box, Image, SimpleGrid, Spinner, Center, useToast} from '@chakra-ui/react';

const TextureDisplay = () => {
    const {generatedImages, setGeneratedImages} = useMaterialStore(state => state);
    const [isLoading, setIsLoading] = React.useState(true);
    const toast = useToast();

    useEffect(() => {
        const fetchTextures = async () => {
            if (generatedImages.length === 0) {
                const textureLoadingPromise = axios.get('http://localhost:3000/api/get_generated_textures')
                    .then(response => {
                        setGeneratedImages(response.data.image_urls);
                        return response;
                    });

                toast.promise(
                    textureLoadingPromise,
                    {
                        loading: "Loading textures...",
                        success: "Textures loaded successfully",
                        error: "Error loading textures"
                    },
                    {
                        duration: 9000,
                        isClosable: true,
                    }
                );

                try {
                    await textureLoadingPromise;
                } catch (error) {
                    console.error('Error fetching texture images:', error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        };
        fetchTextures();
    }, [generatedImages.length, setGeneratedImages, toast]);

    return (
        <Box>
            {isLoading ? (
                <Center><Spinner size="xl" /></Center>
            ) : (
                <SimpleGrid columns={[2, null, 3]} spacing="40px">
                    {generatedImages.map((url, index) => (
                        <Image key={index} src={url} alt={`Texture ${index + 1}`} boxSize="300px" objectFit="cover" />
                    ))}
                </SimpleGrid>
            )}
        </Box>
    );
};

export default TextureDisplay;

