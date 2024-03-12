import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Box, Spacer, Divider, Text, Grid, GridItem, SimpleGrid, Skeleton, SkeletonText, Image, HStack, Heading, Flex, Button, Select, AspectRatio, useColorModeValue} from '@chakra-ui/react';
import {motion} from 'framer-motion';
import {useParams} from 'react-router-dom'; // Import useParams from react-router-dom
import {useGeneratedImagesStore} from '../../../store/store'
import {image} from 'd3';


// helper function to download a material
const handleDownload = async (materialId) => {



    try {
        const apiUrl = import.meta.env.VITE_API_URL
        // First, fetch the filename
        const filenameResponse = await axios.get(apiUrl + `/api/get_material_filename/${materialId}`);
        const filename = filenameResponse.data.filename;
        console.log("handle download for: material_id:", materialId, "filename:", filename, "apiUrl:", apiUrl)

        const response = await axios.get(apiUrl + `/api/download_material/${materialId}`, {
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
    const {promiseId, setPbrIsLoading, pbrIsLoading, setAlbedoIsLoading, albedoIsLoading, setPbrMapUrls, pbrMapUrls, setAlbedoImage, albedoImage, materialName, setMaterialName, setFileName} = useGeneratedImagesStore();

    // const [materialName, setMaterialName] = useState('');
    const [materialId, setMaterialId] = useState(id);
    const MotionImageBox = motion(Box);
    const [imageUrls, setImageUrls] = useState({});
    const [roughnessUrl, setRoughnessUrl] = useState([]);



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
        const fetchRecentPbrs = async () => {
            if (!albedoImage || albedoIsLoading) return;
            try {
                const apiUrl = import.meta.env.VITE_API_URL
                setPbrIsLoading(true);
                console.log('Loading maps for material:', materialId);

                const response = await axios.get(apiUrl + `/api/get_pbr_by_id/${id}`);
                setPbrMapUrls(response.data.image_urls);
                const all_urls = Object.assign({}, {'base_color': albedoImage}, response.data.image_urls);

                setImageUrls(all_urls);

                console.log('fetched pbr urls:', response.data.image_urls, 'all urls:', all_urls, 'pbrIsLoading:', pbrIsLoading)
            } catch (error) {
                console.error('Error fetching recent pbrs:', error);

            }
            finally {
                setPbrIsLoading(false);
            }
        };

        fetchRecentPbrs();

    }, [albedoIsLoading]);




    const imageBoxStyle = {
        whileHover: {scale: 1.05},
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
    const imageLabels = ['Base Color', 'Height', 'Normals', 'Smoothness'];
    const urlLabels = ['base_color', 'height', 'normal', 'smoothness'];
    const displayName = name.replace(/[_]/g, " ").toUpperCase();
    const {image_url} = imageUrls;
    //vars for pbr.one material preview
    const color_map_url = albedoImage;
    const normal_map_url = pbrMapUrls['normal'];
    const height_map_url = pbrMapUrls['height'];
    const smoothness_map_url = pbrMapUrls['smoothness'];
    const [geometry_type, set_geometry_type] = useState('sphere');

    const [environment_type, set_environment_type] = useState(3);
    const baseUrl = 'https://cdn.pbr.one/main/material-shading.html#';
    const query_params = `color_url=${color_map_url}&normal_url=${normal_map_url}&roughness_url=${smoothness_map_url}&displacement_url=${height_map_url}&geometry_type=${geometry_type}&environment_index=${environment_type}&displacement_scale=0.01&tiling_scale=1.33&gui_enable=-1&watermark_enable=0`


    return (

        <Box w='full' h='100%'
        >
            {/* Albedo Image */}

            <Flex direction="column" align="center" mb={10} >
                {/* <SkeletonText isLoaded={materialName} noOfLines={1} w="50%" py={4} mt={4} /> */}
                {materialId && (
                    <>
                        <Heading fontSize={{base: '3xl', sm: '2xl', md: '3xl', lg: '4xl', xl: '5xl'}} color={useColorModeValue('twitter.600', 'purple.600')} py={4} mt={4}
                            textAlign={'center'}
                        >
                            {`${materialName}`}
                        </Heading>

                        <Text
                            fontFamily={'poppins, sans-serif'}
                            fontWeight={'600'}
                            py={'6'}
                            textAlign='center'
                            fontSize={{base: 'xl', sm: 'xl', md: '2xl', lg: '4xl', xl: '5xl'}}
                            color={'whiteAlpha.600'}>
                            {`TEXTURE FILES:`}
                        </Text>
                    </>

                )}



                {/* {materialId && (
                    <Skeleton isLoaded={!albedoIsLoading} position='relative' boxSize={albedoBoxSize} >
                        <MotionImageBox {...imageBoxStyle}>

                            <Image src={albedoImage} alt="Base Color Map" boxSize={albedoBoxSize} objectFit="cover" onClick={() => handleDownload(materialId)} />
                            <Text mt="1" color='whiteAlpha.700' fontWeight={'500'} fontSize={{base: 'lg', sm: 'md', md: 'lg', lg: 'lg', xl: 'xl'}} fontFamily='avenir, sans-serif' textAlign="center" >
                                Base Color Map
                            </Text>

                        </MotionImageBox>
                    </Skeleton>

                )} */}

            </Flex>

            {/* PBR Images: Normal, Height, Smoothness */}
            <Spacer py={5} />
            <Flex direction="column" align="center" >
                <SimpleGrid columns={[2, null, 2, 3]} spacing={10} align='center' justify='center'>
                    {materialId && (

                        ['normal', 'height', 'smoothness'].map((type, index) => (
                            <Skeleton isLoaded={!pbrIsLoading} key={type}  >
                                <MotionImageBox key={type} {...imageBoxStyle}>
                                    <Image src={pbrMapUrls[type]} alt={`${type} Map`} boxSize={pbrBoxSize} objectFit="cover" onClick={() => handleDownload(materialId)} />
                                    <Text mt="1" color='whiteAlpha.700' fontWeight={'500'} fontSize={{base: 'lg', sm: 'md', md: 'lg', lg: 'lg', xl: 'xl'}} fontFamily='avenir, sans-serif' textAlign="center" >
                                        {`${imageLabels[index]} Map`}
                                    </Text>
                                </MotionImageBox>
                            </Skeleton>
                        ))
                    )}

                </SimpleGrid>

                {albedoImage && pbrMapUrls.normal && pbrMapUrls.height && pbrMapUrls.smoothness && (
                    <Box>
                        <Button onClick={() => handleDownload(materialId)} colorScheme={useColorModeValue('facebook', 'gray')} variant="solid" mt={5} size={{base: 'md', sm: 'md', md: 'lg'}}>
                            Download
                        </Button>
                    </Box>
                )}
            </Flex>
            <>
                <Grid
                    templateColumns={{base: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)', xl: 'repeat(4, 1fr)'}}
                    gap={[4, 4, 6, 8]}
                >
                    {!pbrIsLoading && !albedoIsLoading && imageUrls && urlLabels.map((type, index) => (

                        <GridItem
                            key={index}
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


                            <Image src={imageUrls[type]} alt={`${imageLabels[index]} Map`}
                                fit='cover'
                                borderWidth='.05rem'
                                borderColor='whiteAlpha.400'
                                borderStyle='solid'
                                borderRadius={'md'}
                                onClick={() => handleDownload(materialId)}
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
                    {/* {isLoading && [1, 2, 3, 4].map((_, index) => (
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
                        ))} */}
                </Grid>


            </>

            <>
                {/* <Flex direction="column" align="center" mt={5}>
                    {materialId && !albedoIsLoading && !pbrIsLoading && (
                        <>
                            <Divider orientation='horizontal' borderWidth={'.1rem'} w={'full'} borderColor={useColorModeValue('purple.600', 'twitter.600')} borderStyle={'solid'} />
                            <Spacer py={2} />

                            <Text
                                fontFamily={'poppins, sans-serif'}
                                fontWeight={'600'}
                                py={'6'}
                                textAlign='center'
                                fontSize={{base: 'xl', sm: 'xl', md: '2xl', lg: '4xl', xl: '5xl'}}
                                color={'whiteAlpha.600'}>
                                {`LIVE PREVIEW:`}
                            </Text>
                            <Box
                                boxShadow="xl"
                                borderRadius="md"
                                overflow="hidden"
                                border="1px solid"
                                borderColor="gray.400"
                                as='iframe' maxW='750px' w={'100%'} height={'500px'} src={`${baseUrl}${query_params}`}>
                            </Box>
                            <Spacer py={1} />


                            <HStack>

                                <Select
                                    color='white'
                                    value={geometry_type} onChange={(e) => set_geometry_type(e.target.value)} mb={4}>
                                    <option value="sphere">Sphere</option>
                                    <option value="plane">Plane</option>
                                    <option value="cube">Cube</option>
                                    <option value="cylinder">Cylinder</option>
                                    <option value="torus">Torus</option>

                                </Select>
                                <Select
                                    color={'white'}
                                    // variant={'outline'}
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
 */}

            </>
            <Spacer h='60px' />
        </Box >
    );
};

export default TextureDisplayById;
