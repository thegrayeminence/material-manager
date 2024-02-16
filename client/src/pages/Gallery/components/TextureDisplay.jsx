import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useGeneratedImagesStore} from '../../../store/store';
import {Box, SimpleGrid, Skeleton, Image, Heading, Flex} from '@chakra-ui/react';
import {motion} from 'framer-motion';


// helper function to download a material
const handleDownload = async (materialId) => {

    // const material_id = useGeneratedImagesStore(state => state.materialId);
    console.log("material_id:", materialId)
    try {
        const response = await axios.get(`/api/download_material/${materialId}`, {responseType: 'blob'});
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        console.log("link:", link, "url:", url)
        link.setAttribute('download', `material_${materialId}.zip`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    } catch (error) {
        console.error("Error downloading material:", error);

    }
};

const TextureDisplay = () => {
    //zustand store values
    const {setPBRImage} = useGeneratedImagesStore();
    const [materialId, setMaterialId] = useState(null);
    const [albedoImage, setAlbedoImage] = useState(null);
    const [pbrMapUrls, setPbrMapUrls] = useState({normal: null, height: null, smoothness: null});
    const store_materialId = useGeneratedImagesStore(state => state.materialId);

    const MotionImageBox = motion(Box);

    //styling image box
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
    //box sizes
    const albedoBoxSize = "360px";
    const pbrBoxSize = "300px";

    // Fetch the most recent albedo image and its material ID
    useEffect(() => {
        const fetchRecentAlbedo = async () => {
            try {
                const response = await axios.get(`/api/get_recent_albedo`);
                setAlbedoImage(response.data.image_url);
                setMaterialId(response.data.material_id);
                console.log(materialId, store_materialId)
            } catch (error) {
                console.error('Error fetching recent albedo:', error);
                console.log(materialId, store_materialId)

            }
        };

        fetchRecentAlbedo();
    }, []);

    // Fetch the PBR maps using the material ID
    useEffect(() => {
        if (!materialId) return;

        const fetchMap = async (mapType) => {
            try {
                console.log("Current materialId:", materialId);
                const response = await axios.get(`/api/get_${mapType}_by_id/${materialId}`);
                return response.data.image_url;
            } catch (error) {
                console.error(`Error fetching ${mapType} map:`, error);
                return null;
            }
        };
        const loadMaps = async () => {
            console.log("Current materialId:", materialId);
            const mapTypes = ['albedo', 'normal', 'height', 'smoothness'];
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


    return (
        <Box p={5}>
            {/* Albedo Image */}
            <Flex direction="column" align="center" mb={10}>
                <Heading mb={4} color="purple.500">Albedo</Heading>
                {albedoImage ? (
                    <MotionImageBox {...imageBoxStyle}>
                        <Image src={albedoImage} alt="Albedo Texture" boxSize={albedoBoxSize} objectFit="cover" onClick={() => handleDownload(materialId)} />
                    </MotionImageBox>
                ) : (
                    <Skeleton height={albedoBoxSize} />
                )}
            </Flex>

            {/* PBR Images: Normal, Height, Smoothness */}
            <Flex direction="column" align="center">
                <Heading mb={4} color="blue.500">PBR Maps</Heading>
                <SimpleGrid columns={[2, null, 3]} spacing="30px" justifyContent="center">
                    {['normal', 'height', 'smoothness'].map((type, index) => (
                        pbrMapUrls[type] ? (
                            <MotionImageBox key={type} {...imageBoxStyle}>
                                <Image src={pbrMapUrls[type]} alt={`${type} Texture`} boxSize={pbrBoxSize} objectFit="cover" />
                            </MotionImageBox>
                        ) : (
                            <Skeleton key={index} height={pbrBoxSize} />
                        )
                    ))}
                </SimpleGrid>
            </Flex>
        </Box >
    );
};

export default TextureDisplay;