import React, {useEffect, useState} from 'react';
import {Box, Heading, Text, Flex, CircularProgress, Spacer, Image, SimpleGrid, Skeleton} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {motion} from 'framer-motion';

// import {API_URL} from './client/src/config/URLConfig.js';



const MotionImageBox = motion(Box);


const LoadingMessages = [
    "Connecting to database...",
    "Constructing prompts...",
    "Storing material data...",
    "Making API calls...",
    "Generating maps...",
    "Hold tight, your packets are traveling at the speed of light!",
    "Maximizing Spiral Energy Output...",
    "Encoding texture files...",
    "Transcompiling Pseudo-Quarks...",
    "Attempting to reverse entropy...",
    "Sending requests...",
];

const LoadingPage = () => {

    const [currentMessage, setCurrentMessage] = useState(0);
    const [albedoImage, setAlbedoImage] = useState(null);
    const [pbrMapUrls, setPbrMapUrls] = useState({normal: null, height: null, smoothness: null});
    const navigate = useNavigate();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentMessage((prev) => (prev + 1) % LoadingMessages.length);
        }, 4000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const fetchRecentAlbedo = async () => {
            try {
                const response = await axios.get(`/api/get_recent_albedo`);
                setAlbedoImage(response.data.image_url);
                loadPBRMaps(response.data.material_id);
            } catch (error) {
                console.error('Error fetching recent albedo:', error);
            }
        };

        fetchRecentAlbedo();
    }, []);

    const loadPBRMaps = async (materialId) => {
        const mapTypes = ['normal', 'height', 'smoothness'];
        const mapPromises = mapTypes.map(mapType => axios.get(`/api/get_${mapType}_by_id/${materialId}`));

        try {
            const maps = await Promise.all(mapPromises);
            const newPbrMapUrls = {};
            mapTypes.forEach((mapType, index) => {
                newPbrMapUrls[mapType] = maps[index].data.image_url;
            });
            setPbrMapUrls(newPbrMapUrls);

            // Navigate to gallery only after all maps are loaded
            if (Object.values(newPbrMapUrls).every(url => url)) {
                navigate('/gallery');
            }
        } catch (error) {
            console.error('Error fetching PBR maps:', error);
        }
    };

    return (
        <Box mt={'10%'} p={'2.5rem'} fontSize={'2xl'} textAlign={'center'}>
            {albedoImage ? (
                <>
                    <Flex direction="column" align="center" mb={10}>
                        <MotionImageBox
                            whileHover={{scale: 1.05}}
                            boxShadow="md"
                            borderRadius="lg"
                            overflow="hidden"
                            border="1px solid"
                            borderColor="gray.200"
                            mb={8}
                        >
                            <Image src={albedoImage} alt="Albedo Texture" boxSize="300px" objectFit="cover" />
                        </MotionImageBox>
                    </Flex>

                    <Heading mb={4}>Loading PBR Maps...</Heading>
                    <Text>{LoadingMessages[currentMessage]}</Text>
                    <Spacer p={'1rem'} />
                    <SimpleGrid columns={[2, null, 3]} spacing="40px">
                        {['normal', 'height', 'smoothness'].map((type, index) => (
                            pbrMapUrls[type] ? (
                                <MotionImageBox
                                    key={type}
                                    whileHover={{scale: 1.05}}
                                    boxShadow="md"
                                    borderRadius="lg"
                                    overflow="hidden"
                                    border="1px solid"
                                    borderColor="gray.200"
                                >
                                    <Image src={pbrMapUrls[type]} alt={`${type} Texture`} boxSize="300px" objectFit="cover" />
                                </MotionImageBox>
                            ) : (
                                <Skeleton key={index} height="300px" />
                            )
                        ))}
                    </SimpleGrid>
                </>
            ) : (
                <>
                    <Heading>Loading Albedo...</Heading>
                    <Text>{LoadingMessages[currentMessage]}</Text>
                    <Spacer p={'1rem'} />
                    <CircularProgress isIndeterminate size='5rem' color='green.300' />
                </>
            )
            }
        </Box >
    );
};

export default LoadingPage;

