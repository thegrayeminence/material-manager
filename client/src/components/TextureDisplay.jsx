import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useGeneratedImagesStore} from '../store/store';
import {Box, SimpleGrid, Skeleton, Image, Heading, Flex} from '@chakra-ui/react';
import {motion} from 'framer-motion';

const MotionImageBox = motion(Box);

const TextureDisplay = () => {
    const {setPBRImage} = useGeneratedImagesStore();
    const [materialId, setMaterialId] = useState(null);
    const [albedoImage, setAlbedoImage] = useState(null);
    const [pbrMapUrls, setPbrMapUrls] = useState({normal: null, height: null, smoothness: null});

    // Fetch the most recent albedo image and its material ID
    useEffect(() => {
        const fetchRecentAlbedo = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/get_recent_albedo');
                setAlbedoImage(response.data.image_url);
                setMaterialId(response.data.material_id);
            } catch (error) {
                console.error('Error fetching recent albedo:', error);
            }
        };

        fetchRecentAlbedo();
    }, []);

    // Fetch the PBR maps using the material ID
    useEffect(() => {
        if (!materialId) return;

        const fetchMap = async (mapType) => {
            try {
                const response = await axios.get(`http://localhost:3001/api/get_${mapType}_by_id/${materialId}`);
                return response.data.image_url;
            } catch (error) {
                console.error(`Error fetching ${mapType} map:`, error);
                return null;
            }
        };
        const loadMaps = async () => {
            const mapTypes = ['normal', 'height', 'smoothness'];
            const mapPromises = mapTypes.map(mapType => fetchMap(mapType));
            const maps = await Promise.all(mapPromises);

            const newPbrMapUrls = {};
            mapTypes.forEach((mapType, index) => {
                newPbrMapUrls[mapType] = maps[index];
                if (maps[index]) {
                    setPBRImage(mapType, maps[index]);
                }
            });
            setPbrMapUrls(newPbrMapUrls);
        };

        loadMaps();
    }, [materialId, setPBRImage]);


    const imageBoxStyle = {
        whileHover: {scale: 1.1},
        boxShadow: "xl",
        borderRadius: "md",
        overflow: "hidden",
        border: "2px solid",
        borderColor: "gray.300",
        bg: "gray.50",
        cursor: "pointer",
        transition: "all 0.3s ease-in-out"
    };

    const albedoBoxSize = "360px"; // 20% larger than PBR maps
    const pbrBoxSize = "300px";

    return (
        <Box p={5}>
            {/* Albedo Image */}
            <Flex direction="column" align="center" mb={10}>
                <Heading mb={4} color="purple.500">Albedo</Heading>
                {albedoImage ? (
                    <MotionImageBox {...imageBoxStyle}>
                        <Image src={albedoImage} alt="Albedo Texture" boxSize={albedoBoxSize} objectFit="cover" />
                    </MotionImageBox>
                ) : (
                    <Skeleton height={albedoBoxSize} />
                )}
            </Flex>

            {/* PBR Images: Normal, Height, Smoothness */}
            <Box>
                <Heading mb={4}>PBR Maps</Heading>
                <SimpleGrid columns={[2, null, 3]} spacing="40px">
                    {['normal', 'height', 'smoothness'].map((type, index) => (
                        pbrMapUrls[type] ? (
                            <MotionImageBox {...imageBoxStyle}>
                                <Image src={pbrMapUrls[type]} alt={`${type} Texture`} boxSize={pbrBoxSize} objectFit="cover" />
                            </MotionImageBox>
                        ) : (
                            <Skeleton key={index} height="300px" />
                        )
                    ))}
                </SimpleGrid>
            </Box>
        </Box >
    );
};

export default TextureDisplay;

