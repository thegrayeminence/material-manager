import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useGeneratedImagesStore} from '../../../store/store';
import {Box, SimpleGrid, Skeleton, Image, Heading, Flex, Button, Select} from '@chakra-ui/react';
import {motion} from 'framer-motion';
import {useParams} from 'react-router-dom'; // Import useParams from react-router-dom



// helper function to download a material
const handleDownload = async (materialId) => {
    console.log("material_id:", materialId)
    try {

        // First, fetch the filename
        const filenameResponse = await axios.get(`http://localhost:3001/api/get_material_filename/${materialId}`);
        const filename = filenameResponse.data.filename;
        // console.log("filename:", filename);

        const response = await axios.get(`http://localhost:3001/api/download_material/${materialId}`, {
            responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    } catch (error) {
        console.error("Error downloading material:", error);

    }
};

const TextureDisplayById = () => {
    const {id} = useParams(); // Get the 'id' parameter from the URL as a string

    const {setPBRImage} = useGeneratedImagesStore();
    const [materialId, setMaterialId] = useState(null);
    const [albedoImage, setAlbedoImage] = useState(null);
    const [pbrMapUrls, setPbrMapUrls] = useState({normal: null, height: null, smoothness: null});
    // const store_materialId = useGeneratedImagesStore(state => state.materialId);

    const MotionImageBox = motion(Box);

    // Fetch the most recent albedo image and its material ID
    useEffect(() => {
        const fetchRecentAlbedo = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/get_albedo_by_id/${id}`); // Use 'id' as a string
                setAlbedoImage(response.data.image_url);
                setMaterialId(response.data.material_id);
            } catch (error) {
                console.error('Error fetching recent albedo:', error);

            }
        };

        fetchRecentAlbedo();
    }, [id]);

    // Fetch the PBR maps using the material ID
    useEffect(() => {
        if (!materialId) return;

        const fetchMap = async (mapType) => {
            try {
                const response = await axios.get(`http://localhost:3001/api/get_${mapType}_by_id/${id}`); // Use 'id' as a string
                return response.data.image_url;
            } catch (error) {
                console.error(`Error fetching ${mapType} map:`, error);
                return null;
            }
        };
        const loadMaps = async () => {
            console.log("Current materialId:", materialId);
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
            console.log('color url:', albedoImage, 'pbr urls:', newPbrMapUrls)
        };

        loadMaps();

    }, [materialId, setPBRImage, id]); // Include 'id' as a dependency


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
    const color_map_url = albedoImage;
    const normal_map_url = pbrMapUrls.normal;
    const height_map_url = pbrMapUrls.height;
    const smoothness_map_url = pbrMapUrls.smoothness;
    const [geometry_type, set_geometry_type] = useState('cylinder');

    // function for pbr.one preview link
    const redirectToExternalLink = () => {
        const baseUrl = 'https://cdn.pbr.one/main/material-shading.html#';
        const queryParams = new URLSearchParams({
            color_url: color_map_url,
            normal_url: normal_map_url,
            roughness_url: smoothness_map_url,
            displacement_url: height_map_url,
            geometry_type: geometry_type,
            displacement_scale: '0.01',
            tiling_scale: '1.33',
        }).toString();

        const fullUrl = `${baseUrl}${queryParams}`;
        // opens link in current tab
        // window.location.href = fullUrl;
        //opens link in new tab:
        window.open(fullUrl, '_blank');
    };

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
            <Flex direction="column" align="center" mt={5}>
                <Select placeholder="Select geometry type" value={geometry_type} onChange={(e) => set_geometry_type(e.target.value)} mb={4}>
                    <option value="sphere">Sphere</option>
                    <option value="plane">Plane</option>
                    <option value="cube">Cube</option>
                    <option value="cylinder">Cylinder</option>
                    <option value="torus">Torus</option>

                </Select>
                <Button colorScheme="blue" onClick={redirectToExternalLink}>Go to External Link</Button>
            </Flex>
        </Box >
    );
};

export default TextureDisplayById;

