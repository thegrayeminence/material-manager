import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Box, Spacer, Divider, Text, SimpleGrid, Skeleton, Image, HStack, Heading, Flex, Button, Select, AspectRatio, useColorModeValue} from '@chakra-ui/react';
import {motion} from 'framer-motion';
import {useParams} from 'react-router-dom'; // Import useParams from react-router-dom




// helper function to download a material
const handleDownload = async (materialId) => {


    console.log("material_id:", materialId)
    try {

        // First, fetch the filename
        const filenameResponse = await axios.get(`/api/get_material_filename/${materialId}`);
        const filename = filenameResponse.data.filename;

        const response = await axios.get(`/api/download_material/${materialId}`, {
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
    // const {setPBRImage} = useGeneratedImagesStore();
    const [materialName, setMaterialName] = useState(null);
    const [materialId, setMaterialId] = useState(null);
    setMaterialId(id);
    const [albedoImage, setAlbedoImage] = useState(null);
    const [pbrMapUrls, setPbrMapUrls] = useState({normal: null, height: null, smoothness: null});
    const [albedoIsLoading, setAlbedoIsLoading] = useState(true);
    const [pbrIsLoading, setPbrIsLoading] = useState(true);


    const MotionImageBox = motion(Box);


    useEffect(() => {
        const fetchRecentAlbedo = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL
                setAlbedoIsLoading(true);
                const filenameResponse = await axios.get(apiUrl + `/api/get_material_filename/${id}`);
                const filename = filenameResponse.data.filename;
                const formattedFileName = filename.replace('.zip', '').replace(/[_]/g, " ").toUpperCase();
                setMaterialName(formattedFileName);

                const response = await axios.get(apiUrl + `/api/get_albedo_by_id/${id}`);
                setAlbedoImage(response.data.base_color_url);
                setAlbedoIsLoading(false);
                console.log(`Albedo Image URL: ${response.data.base_color_url}, albedoIsLoading: ${albedoIsLoading}`)
            } catch (error) {
                console.error('Error fetching recent albedo:', error);

            }
        };

        fetchRecentAlbedo();
    }, []);


    useEffect(() => {
        if (!albedoImage || albedoIsLoading) return;
        const fetchMap = async (mapType) => {

            try {
                const apiUrl = import.meta.env.VITE_API_URL
                console.log("Fetching", mapType, "map for material", materialId);
                const response = await axios.get(apiUrl + `/api/get_${mapType}_by_id/${id}`);
                return response.data.image_url;

            } catch (error) {
                console.error(`Error fetching ${mapType} map:`, error);
                return null;
            }
        };
        const loadMaps = async () => {
            setPbrIsLoading(true);
            console.log('Loading maps for material:', materialId);
            const mapTypes = ['normal', 'height', 'smoothness'];
            const mapPromises = mapTypes.map(mapType => fetchMap(mapType));
            const maps = await Promise.all(mapPromises);

            const newPbrMapUrls = {};
            mapTypes.forEach((mapType, index) => {
                newPbrMapUrls[mapType] = maps[index];
                // if (maps[index]) {
                //     setPBRImage(mapType, maps[index]);
                // }
            });
            setPbrMapUrls(newPbrMapUrls);
            setPbrIsLoading(false);
            console.log('color url:', albedoImage, 'pbr urls:', newPbrMapUrls)
        };

        loadMaps();

    }, [albedoIsLoading]);


    const imageBoxStyle = {
        whileHover: {scale: 1.1},
        boxShadow: "xl",
        borderRadius: "md",
        overflow: "hidden",
        border: "1px solid",
        borderColor: "gray.400",
        bg: "whiteAlpha.200",
        backdropFilter: "blur(10px)",
        cursor: "pointer",
        transition: "all 0.3s ease-in-out"
    };


    const albedoBoxSize = "300px";
    const pbrBoxSize = "300px";
    const imageLabels = ['Normals', 'Height', 'Smoothness'];

    //vars for pbr.one material preview
    const color_map_url = albedoImage;
    const normal_map_url = pbrMapUrls.normal;
    const height_map_url = pbrMapUrls.height;
    const smoothness_map_url = pbrMapUrls.smoothness;
    const [geometry_type, set_geometry_type] = useState('cylinder');
    const [environment_type, set_environment_type] = useState(0);
    const baseUrl = 'https://cdn.pbr.one/main/material-shading.html#';
    const query_params = `color_url=${color_map_url}&normal_url=${normal_map_url}&roughness_url=${smoothness_map_url}&displacement_url=${height_map_url}&geometry_type=${geometry_type}&environment_index=${environment_type}&displacement_scale=0.01&tiling_scale=1.33&gui_enable=-1&watermark_enable=0`

    // // function for pbr.one preview link
    // const redirectToExternalLink = () => {
    //     const queryParams = new URLSearchParams({
    //         color_url: color_map_url,
    //         normal_url: normal_map_url,
    //         roughness_url: smoothness_map_url,
    //         displacement_url: height_map_url,
    //         geometry_type: geometry_type,
    //         displacement_scale: '0.01',
    //         tiling_scale: '1.33',
    //         gui_enable: '0',
    //         watermark_enable: '0',
    //     }).toString();

    //     const fullUrl = `${baseUrl}${queryParams}`;
    //     // opens link in current tab
    //     // window.location.href = fullUrl;
    //     //opens link in new tab:
    //     window.open(fullUrl, '_blank');
    // };

    return (

        <Box
        >
            {/* Albedo Image */}

            <Flex direction="column" align="center" mb={10} >

                {materialName && (<Heading fontSize={{base: '2xl', sm: 'xl', md: '2xl', lg: '3xl', xl: '4xl'}} color={useColorModeValue('twitter.600', 'purple.600')} py={4} mt={4}>
                    {`${materialName}`}
                </Heading>)}



                {albedoImage && albedoImage.length > 0 && (
                    <Skeleton isLoaded={albedoImage} position='relative' boxSize={albedoBoxSize} >
                        <MotionImageBox {...imageBoxStyle}>

                            <Image src={albedoImage} alt="Base Color Map" boxSize={albedoBoxSize} objectFit="cover" onClick={() => handleDownload(materialId)} />
                            <Text mt="1" color='whiteAlpha.700' fontWeight={'500'} fontSize={{base: 'lg', sm: 'md', md: 'lg', lg: 'lg', xl: 'xl'}} fontFamily='avenir, sans-serif' textAlign="center" >
                                Base Color Map
                            </Text>

                        </MotionImageBox>
                    </Skeleton>

                )}

            </Flex>
            {/* PBR Images: Normal, Height, Smoothness */}
            <Flex direction="column" align="center">
                <SimpleGrid columns={[2, null, 3]} spacing="30px" justifyContent="center">
                    {pbrMapUrls && pbrMapUrls['smoothness'] && pbrMapUrls['normal'] && pbrMapUrls['height'] && (

                        ['normal', 'height', 'smoothness'].map((type, index) => (
                            <Skeleton isLoaded={pbrMapUrls[index]} key={type}  >
                                <MotionImageBox key={type} {...imageBoxStyle}>
                                    <Image src={pbrMapUrls[type]} alt={`${type} Map`} boxSize={pbrBoxSize} objectFit="cover" />
                                    <Text mt="1" color='whiteAlpha.700' fontWeight={'500'} fontSize={{base: 'lg', sm: 'md', md: 'lg', lg: 'lg', xl: 'xl'}} fontFamily='avenir, sans-serif' textAlign="center" >
                                        {`${imageLabels[index]} Map`}
                                    </Text>
                                </MotionImageBox>
                            </Skeleton>
                        )))}

                </SimpleGrid>

                {albedoImage && pbrMapUrls.normal && pbrMapUrls.height && pbrMapUrls.smoothness && (
                    <Box>
                        <Button onClick={() => handleDownload(materialId)} colorScheme={useColorModeValue('facebook', 'gray')} variant="solid" mt={5} size={{base: 'md', sm: 'md', md: 'md', lg: 'lg', xl: 'lg'}}>
                            Download
                        </Button>
                    </Box>
                )}
            </Flex>

            <Flex direction="column" align="center" mt={5}>
                {albedoImage && pbrMapUrls.normal && pbrMapUrls.height && pbrMapUrls.smoothness && (
                    <>
                        <Divider orientation='horizontal' borderWidth={'.1rem'} w={'full'} borderColor={useColorModeValue('purple.600', 'twitter.600')} borderStyle={'solid'} />
                        <Spacer py={2} />

                        <Heading fontSize={{base: 'xl', sm: 'lg', md: 'xl', lg: '2xl', xl: '4xl'}} color={useColorModeValue('twitter.600', 'purple.600')} py={4}>
                            Material Preview:
                        </Heading>
                        <Box
                            boxShadow="xl"
                            borderRadius="md"
                            overflow="hidden"
                            border="1px solid"
                            borderColor="gray.400"
                            as='iframe' maxW='750px' w={'100%'} height={'500px'} src={`${baseUrl}${query_params}`}>
                        </Box>
                        <Spacer py={1} />
                        {/* <Text fontSize={{base: 'lg', sm: 'md', md: 'lg', lg: 'xl', xl: '2xl'}} color="whiteAlpha.600">
                            Preview Settings:
                        </Text> */}

                        <HStack>

                            <Select boxShadow="xl" value={geometry_type} onChange={(e) => set_geometry_type(e.target.value)} mb={4}>
                                <option value="sphere">Sphere</option>
                                <option value="plane">Plane</option>
                                <option value="cube">Cube</option>
                                <option value="cylinder">Cylinder</option>
                                <option value="torus">Torus</option>

                            </Select>
                            <Select
                                boxShadow="xl"
                                value={environment_type} onChange={(e) => set_environment_type(e.target.value)} mb={4}>
                                <option value="0">Studio</option>
                                <option value="1">Dune</option>
                                <option value="2">Forest</option>
                                <option value="3">Field</option>
                                <option value="4">Computer Lab</option>
                                <option value="5">Night</option>
                            </Select>
                        </HStack>
                    </>
                )}


            </Flex>
        </Box >
    );
};

export default TextureDisplayById;

