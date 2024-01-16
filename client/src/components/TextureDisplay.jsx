import React, {useEffect} from 'react';
import axios from 'axios';
import {useGeneratedImagesStore} from '../store/store';
import {Box, SimpleGrid, Skeleton, Image, Heading} from '@chakra-ui/react';
import {motion} from 'framer-motion';

const MotionImageBox = motion(Box);

const TextureDisplay = ({materialId}) => {
    const {albedoImage, pbrImages, setPBRImage} = useGeneratedImagesStore();

    useEffect(() => {
        const loadMaps = async () => {
            if (!pbrImages.normal) {
                try {
                    const normalResponse = await axios.get(`http://localhost:3001/api/get_normal_by_id/${materialId}`);
                    setPBRImage('normal', normalResponse.data.image_url);
                } catch (error) {
                    console.error('Error fetching normal map:', error);
                }
            }

            if (!pbrImages.height) {
                try {
                    const heightResponse = await axios.get(`http://localhost:3001/api/get_height_by_id/${materialId}`);
                    setPBRImage('height', heightResponse.data.image_url);
                } catch (error) {
                    console.error('Error fetching height map:', error);
                }
            }

            if (!pbrImages.smoothness) {
                try {
                    const smoothnessResponse = await axios.get(`http://localhost:3001/api/get_smoothness_by_id/${materialId}`);
                    setPBRImage('smoothness', smoothnessResponse.data.image_url);
                } catch (error) {
                    console.error('Error fetching smoothness map:', error);
                }
            }
        };

        if (materialId) {
            loadMaps();
        }
    }, [materialId, pbrImages, setPBRImage]);

    return (
        <Box p={5}>
            {/* Albedo Image */}
            <Box mb={8}>
                <Heading mb={4}>Albedo</Heading>
                {albedoImage ? (
                    <MotionImageBox
                        whileHover={{scale: 1.05}}
                        boxShadow="md"
                        borderRadius="lg"
                        overflow="hidden"
                        border="1px solid"
                        borderColor="gray.200"
                    >
                        <Image src={albedoImage} alt="Albedo Texture" boxSize="300px" objectFit="cover" />
                    </MotionImageBox>
                ) : (
                    <Skeleton height="300px" />
                )}
            </Box>

            {/* PBR Images: Normal, Height, Smoothness */}
            <Box>
                <Heading mb={4}>PBR Maps</Heading>
                <SimpleGrid columns={[2, null, 3]} spacing="40px">
                    {['normal', 'height', 'smoothness'].map((type, index) => (
                        pbrImages[type] ? (
                            <MotionImageBox
                                key={type}
                                whileHover={{scale: 1.05}}
                                boxShadow="md"
                                borderRadius="lg"
                                overflow="hidden"
                                border="1px solid"
                                borderColor="gray.200"
                            >
                                <Image src={pbrImages[type]} alt={`${type} Texture`} boxSize="300px" objectFit="cover" />
                            </MotionImageBox>
                        ) : (
                            <Skeleton key={index} height="300px" />
                        )
                    ))}
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default TextureDisplay;
