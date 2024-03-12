import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Box, Spacer, Divider, Text, Grid, Container, VStack, Center, GridItem, SimpleGrid, Skeleton, SkeletonText, Image, HStack, Heading, Flex, Button, Select, AspectRatio, useColorModeValue} from '@chakra-ui/react';
import {motion} from 'framer-motion';
import {useParams} from 'react-router-dom'; // Import useParams from react-router-dom
import {useGeneratedImagesStore} from '../../../store/store'
import PBROnePreviewBox_NotGallery from "./PBROnePreviewBox_NotGallery";

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
                // console.log(`Albedo Image URL: ${response.data.base_color_url}, albedoIsLoading: ${albedoIsLoading}`)
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

                // console.log('fetched pbr urls:', response.data.image_urls, 'all urls:', all_urls, 'pbrIsLoading:', pbrIsLoading)
            } catch (error) {
                console.error('Error fetching recent pbrs:', error);

            }
            finally {
                setPbrIsLoading(false);
            }
        };

        fetchRecentPbrs();

    }, [albedoIsLoading]);


    const imageLabels = ['Base Color', 'Height', 'Normals', 'Smoothness'];
    const urlLabels = ['base_color', 'height', 'normal', 'smoothness'];
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

            <Flex direction="column" align="center" mb={10} >

                <>
                    <Container centerContent >
                        <SkeletonText isLoaded={materialName.length > 0}>
                            <Text
                                fontFamily={'poppins black, sans-serif'}
                                fontWeight={'800'}
                                textAlign='center'
                                fontSize={{base: '3xl', sm: '2xl', md: '3xl', lg: '4xl', xl: '5xl'}}
                                color={useColorModeValue('teal.600', 'purple.600')}
                                opacity={0.99}
                                noOfLines={[3, 3, 2, 2]}
                                letterSpacing={'wide'}
                                whiteSpace={'pretty'}

                            >
                                {`${materialName}`}
                            </Text>
                        </SkeletonText>
                        <Text
                            fontFamily={'poppins, sans-serif'}
                            fontWeight={'600'}
                            py={'6'}
                            textAlign='center'
                            noOfLines={1}
                            fontSize={{base: 'xl', sm: 'xl', md: '2xl', lg: '4xl', xl: '5xl'}}
                            color={'whiteAlpha.600'}>
                            {`TEXTURE FILES:`}
                        </Text>

                    </Container>




                </>


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
                            <Skeleton isLoaded={!pbrIsLoading && !albedoIsLoading} >

                                <Image src={imageUrls[type]} alt={`${imageLabels[index]} Map`}
                                    fit='cover'
                                    borderWidth='.05rem'
                                    borderColor='whiteAlpha.400'
                                    borderStyle='solid'
                                    borderRadius={'md'}
                                    onClick={() => handleDownload(materialId)}
                                />
                            </Skeleton>

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

                </Grid>


            </>


            {albedoImage && pbrMapUrls.normal && pbrMapUrls.height && pbrMapUrls.smoothness && (

                <Center>
                    <Button
                        bgGradient={useColorModeValue('linear(to-r, teal.400,green.400)', 'linear(to-r, purple.500, blue.500)')}
                        _active={{transform: 'scale(1.15)'}}
                        _hover={{transform: 'scale(1.05)', bg: "<color>", textColor: 'white', bgGradient: useColorModeValue('linear(to-r, purple.600,blue.600)', 'linear(to-r, teal.300, green.300)')}}
                        variant="solid"
                        textColor={'whiteAlpha.800'}
                        mt={5}
                        width={'10rem'}
                        height='3.3rem'
                        fontWeight={'bold'}
                        letterSpacing={'wide'}
                        boxShadow={'base'}
                        borderRadius={'lg'}
                        fontSize={['md', 'lg', 'xl']}
                        onClick={() => handleDownload(materialId)}
                    >
                        DOWNLOAD
                    </Button>
                </Center>
            )}


            {/* <Divider orientation='horizontal' borderWidth={'.1rem'} w={'full'} borderColor={useColorModeValue('purple.600', 'twitter.600')} borderStyle={'solid'} /> */}

            <Spacer py={'2'} />
            <>
                <Flex
                    direction="column"
                    align="center"
                >
                    {!pbrIsLoading && !albedoIsLoading && (
                        <Text
                            fontFamily={'poppins, sans-serif'}
                            fontWeight={'600'}
                            letterSpacing={'wide'}
                            mt='2.5%'
                            textAlign='center'
                            fontSize={{base: '2xl', sm: '2xl', md: '3xl', lg: '4xl', xl: '6xl'}}
                            color={'whiteAlpha.600'}
                        >
                            {`LIVE PREVIEW:`}
                        </Text>
                    )}

                    <Spacer py={2} />

                    {pbrIsLoading || albedoIsLoading && (
                        <VStack
                            ml='5%'
                            p={{base: 8, sm: 5, md: 8, lg: 8, xl: 10}}
                            borderWidth="2px"
                            borderColor={'whiteAlpha.400'}
                            boxShadow={'xl'}
                            bg={useColorModeValue('whiteAlpha.200', 'blackAlpha.400')}
                            borderRadius="lg"
                            overflow="hidden"
                            backdropFilter="blur(10px)">
                            <Skeleton boxSize={500} />
                        </VStack>
                    )}

                    {!pbrIsLoading && !albedoIsLoading && (
                        <>
                            <VStack
                                position={'relative'}
                                py={[8, 5, 8, 8, 10]}
                                borderWidth=".2rem"
                                borderColor={'whiteAlpha.400'}
                                borderStyle={'ridge'}
                                boxShadow={'base'}
                                bg={useColorModeValue('whiteAlpha.200', 'blackAlpha.400')}
                                borderRadius="lg"
                                overflow="hidden"
                                backdropFilter="blur(10px)"
                                maxW='90vw'
                                mx='auto'
                            >
                                <Box
                                    position={'relative'}
                                    overflow={'hidden'}
                                    width={'auto'}
                                    h='full'
                                    borderRadius={'lg'}
                                    boxShadow={'base'}
                                    paddingY='2.5%'
                                    align='center'

                                >

                                    <Box
                                        as='iframe'
                                        top={0}
                                        left={0}
                                        bottom={0}
                                        right={0}
                                        border='.15rem solid'
                                        borderLeft={'none'}
                                        borderRight={'none'}
                                        borderColor='gray'
                                        height={['200px', '280px', '425px', '500px']}
                                        width={['350px', '500px', '750px', '900px']}
                                        src={`${baseUrl}${query_params}`}>
                                    </Box>
                                </Box>
                                <Spacer py={1} />
                                <Text fontWeight={'600'} fontSize={{base: 'lg', sm: 'md', md: 'lg', lg: 'xl', xl: '2xl'}} color="whiteAlpha.600">
                                    Preview Settings:
                                </Text>
                                <HStack>
                                    <Select
                                        textColor='whiteAlpha.700'
                                        borderColor='whiteAlpha.300'
                                        borderWidth='.15rem'
                                        boxShadow={'xl'}
                                        color='whiteAlpha.700'
                                        value={geometry_type}
                                        onChange={(e) => set_geometry_type(e.target.value)} mb={4}>
                                        <option value="sphere">Sphere</option>
                                        <option value="plane">Plane</option>
                                        <option value="cube">Cube</option>
                                        <option value="cylinder">Cylinder</option>
                                        <option value="torus">Torus</option>
                                    </Select>
                                    <Select textColor='whiteAlpha.700'
                                        borderColor='whiteAlpha.300'
                                        borderWidth='.15rem'
                                        boxShadow={'xl'}
                                        color='whiteAlpha.700'
                                        value={environment_type}
                                        onChange={(e) => set_environment_type(e.target.value)} mb={4}>
                                        <option value="0">Studio</option>
                                        <option value="1">Dune</option>
                                        <option value="2">Forest</option>
                                        <option value="3">Field</option>
                                        <option value="4">Computer Lab</option>
                                        <option value="5">Night</option>
                                    </Select>
                                </HStack>
                            </VStack>
                        </>
                    )}
                </Flex>


            </>
            <Spacer h='60px' />
        </Box >
    );
};

export default TextureDisplayById;
