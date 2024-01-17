import React, {useEffect, useState} from 'react';
import {Box, Heading, Text, CircularProgress, Spacer, Image, SimpleGrid, Skeleton, Flex} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {motion} from 'framer-motion';

const MotionImageBox = motion(Box);


const LoadingMessages = [
    "Connecting to database...",
    "Constructing prompts...",
    "Generating albedo map...",
    "Storing material data...",
    "Making secondary API calls...",
    "Hold tight, your packets are traveling at the speed of light!",
    "Rendering PBR Maps...",
    "Maximizing Spiral Energy...",
    "Encoding image files...",
    "Transcompiling pseudo-space...",
    "Attempting to reverse entropy...",
    "Sending requests.....",
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
                const response = await axios.get('http://localhost:3001/api/get_recent_albedo');
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
        const mapPromises = mapTypes.map(mapType => axios.get(`http://localhost:3001/api/get_${mapType}_by_id/${materialId}`));

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
        <Box fontSize={'2xl'} textAlign={'center'}>
            {albedoImage ? (
                <>
                    {/* albedo map */}
                    <Flex direction="column" align="center" mb={10}>
                        <MotionImageBox {...imageBoxStyle}>
                            <Image src={albedoImage} alt="Albedo Texture" boxSize={albedoBoxSize} objectFit="cover" />
                        </MotionImageBox>
                        <Heading mb={4}>{LoadingMessages[currentMessage]}</Heading>
                        <Spacer p={'1rem'} />
                    </Flex>

                    {/* pbr maps */}
                    <Flex direction="column" align="center">
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




//    OLD GOOD WORKING LOADING SCREEN::::: ///



// import React, {useEffect, useState} from 'react';
// import {Box, Heading, Text, CircularProgress, Spacer, Image, SimpleGrid, Skeleton} from '@chakra-ui/react';
// import {useNavigate} from 'react-router-dom';
// import axios from 'axios';
// import {motion} from 'framer-motion';

// const MotionImageBox = motion(Box);

// const LoadingMessages = [
//     "Connecting to database",
//     "Encoding image files",
//     "Prepping API calls",
//     "Hold tight, your packets are traveling at the speed of light!",
//     "Maximizing Spiral Energy Output...",
//     "Transcompiling Pseudo-Quarks...",
//     "Attempting to reverse entropy...",
//     "Loading.....",
// ];


// const LoadingPage = () => {
//     const [currentMessage, setCurrentMessage] = useState(0);
//     const [albedoImage, setAlbedoImage] = useState(null);
//     const [pbrMapUrls, setPbrMapUrls] = useState({normal: null, height: null, smoothness: null});
//     const [allMapsLoaded, setAllMapsLoaded] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const intervalId = setInterval(() => {
//             setCurrentMessage((prev) => (prev + 1) % LoadingMessages.length);
//         }, 4000);
//         return () => clearInterval(intervalId);
//     }, []);

//     useEffect(() => {
//         const fetchRecentAlbedo = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3001/api/get_recent_albedo');
//                 setAlbedoImage(response.data.image_url);
//                 loadPBRMaps(response.data.material_id);
//             } catch (error) {
//                 console.error('Error fetching recent albedo:', error);
//             }
//         };

//         fetchRecentAlbedo();
//     }, []);

//     const loadPBRMaps = async (materialId) => {
//         const mapTypes = ['normal', 'height', 'smoothness'];
//         const mapPromises = mapTypes.map(mapType => axios.get(`http://localhost:3001/api/get_${mapType}_by_id/${materialId}`));
//         try {
//             const maps = await Promise.all(mapPromises);
//             const newPbrMapUrls = {};
//             mapTypes.forEach((mapType, index) => {
//                 newPbrMapUrls[mapType] = maps[index].data.image_url;
//             });
//             setPbrMapUrls(newPbrMapUrls);

//             // Check if all maps are loaded successfully
//             if (Object.values(newPbrMapUrls).every(url => url)) {
//                 setAllMapsLoaded(true); // Indicate that all maps are loaded
//             }
//         } catch (error) {
//             console.error('Error fetching PBR maps:', error);
//         }
//     };

//     // Navigate to gallery once all maps are confirmed to be loaded
//     useEffect(() => {
//         if (allMapsLoaded) {
//             setTimeout(() => navigate('/gallery'), 2000); // Add a delay to ensure user sees the loading screen
//         }
//     }, [allMapsLoaded, navigate]);
//     return (
//         <Box mt={'10rem'} fontSize={'2xl'} textAlign={'center'}>
//             {albedoImage ? (
//                 <>
//                     <MotionImageBox
//                         whileHover={{scale: 1.05}}
//                         boxShadow="md"
//                         borderRadius="lg"
//                         overflow="hidden"
//                         border="1px solid"
//                         borderColor="gray.200"
//                         mb={8}
//                     >
//                         <Image src={albedoImage} alt="Albedo Texture" boxSize="300px" objectFit="cover" />
//                     </MotionImageBox>

//                     <Heading mb={4}>Loading PBR Maps...</Heading>
//                     <SimpleGrid columns={[2, null, 3]} spacing="40px">
//                         {['normal', 'height', 'smoothness'].map((type, index) => (
//                             pbrMapUrls[type] ? (
//                                 <MotionImageBox
//                                     key={type}
//                                     whileHover={{scale: 1.05}}
//                                     boxShadow="md"
//                                     borderRadius="lg"
//                                     overflow="hidden"
//                                     border="1px solid"
//                                     borderColor="gray.200"
//                                 >
//                                     <Image src={pbrMapUrls[type]} alt={`${type} Texture`} boxSize="300px" objectFit="cover" />
//                                 </MotionImageBox>
//                             ) : (
//                                 <Skeleton key={index} height="300px" />
//                             )
//                         ))}
//                     </SimpleGrid>
//                 </>
//             ) : (
//                 <>
//                     <Heading>Loading Albedo...</Heading>
//                     <CircularProgress isIndeterminate size='5rem' color='green.300' />
//                 </>
//             )}
//             <Text>{LoadingMessages[currentMessage]}</Text>
//             <Spacer p={'1rem'} />
//         </Box>
//     );
// };

// export default LoadingPage;
































// import React, {useEffect, useState} from 'react';
// import {Box, Heading, Text, CircularProgress, Spacer, Image, SimpleGrid, Skeleton} from '@chakra-ui/react';
// import {useNavigate} from 'react-router-dom';
// import axios from 'axios';
// import {motion} from 'framer-motion';

// const MotionImageBox = motion(Box);

// const LoadingMessages = [
//     // ... Existing messages ...
// ];

// const LoadingPage = () => {
//     const [currentMessage, setCurrentMessage] = useState(0);
//     const [albedoImage, setAlbedoImage] = useState(null);
//     const [pbrMapUrls, setPbrMapUrls] = useState({normal: null, height: null, smoothness: null});
//     const navigate = useNavigate();

//     useEffect(() => {
//         const intervalId = setInterval(() => {
//             setCurrentMessage((prev) => (prev + 1) % LoadingMessages.length);
//         }, 4000);

//         return () => clearInterval(intervalId);
//     }, []);

//     useEffect(() => {
//         const fetchRecentAlbedo = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3001/api/get_recent_albedo');
//                 setAlbedoImage(response.data.image_url);
//                 loadPBRMaps(response.data.material_id);
//             } catch (error) {
//                 console.error('Error fetching recent albedo:', error);
//             }
//         };

//         fetchRecentAlbedo();
//     }, []);

//     const loadPBRMaps = async (materialId) => {
//         const mapTypes = ['normal', 'height', 'smoothness'];
//         const mapPromises = mapTypes.map(mapType => axios.get(`http://localhost:3001/api/get_${mapType}_by_id/${materialId}`));

//         try {
//             const maps = await Promise.all(mapPromises);
//             const newPbrMapUrls = {};
//             mapTypes.forEach((mapType, index) => {
//                 newPbrMapUrls[mapType] = maps[index].data.image_url;
//             });
//             setPbrMapUrls(newPbrMapUrls);

//             // Check if all maps are loaded successfully
//             if (Object.values(newPbrMapUrls).every(url => url)) {
//                 navigate('/gallery'); // Navigate to gallery only after all maps are loaded
//             }
//         } catch (error) {
//             console.error('Error fetching PBR maps:', error);
//         }
//     };
//     return (
//         <Box mt={'10rem'} fontSize={'2xl'} textAlign={'center'}>
//             {albedoImage ? (
//                 <>
//                     <MotionImageBox
//                         whileHover={{scale: 1.05}}
//                         boxShadow="md"
//                         borderRadius="lg"
//                         overflow="hidden"
//                         border="1px solid"
//                         borderColor="gray.200"
//                         mb={8}
//                     >
//                         <Image src={albedoImage} alt="Albedo Texture" boxSize="300px" objectFit="cover" />
//                     </MotionImageBox>

//                     <Heading mb={4}>Loading PBR Maps...</Heading>
//                     <SimpleGrid columns={[2, null, 3]} spacing="40px">
//                         {['normal', 'height', 'smoothness'].map((type, index) => (
//                             pbrMapUrls[type] ? (
//                                 <MotionImageBox
//                                     key={type}
//                                     whileHover={{scale: 1.05}}
//                                     boxShadow="md"
//                                     borderRadius="lg"
//                                     overflow="hidden"
//                                     border="1px solid"
//                                     borderColor="gray.200"
//                                 >
//                                     <Image src={pbrMapUrls[type]} alt={`${type} Texture`} boxSize="300px" objectFit="cover" />
//                                 </MotionImageBox>
//                             ) : (
//                                 <Skeleton key={index} height="300px" />
//                             )
//                         ))}
//                     </SimpleGrid>
//                 </>
//             ) : (
//                 <>
//                     <Heading>Loading Albedo...</Heading>
//                     <CircularProgress isIndeterminate size='5rem' color='green.300' />
//                 </>
//             )}
//             <Text>{LoadingMessages[currentMessage]}</Text>
//             <Spacer p={'1rem'} />
//         </Box>
//     );
// };

// export default LoadingPage;

















// old good also, works good bsides no loading screen worky work;

// import React, {useEffect, useState} from 'react';
// import {Box, Heading, Text, CircularProgress, Spacer, Image, SimpleGrid, Skeleton} from '@chakra-ui/react';
// import {useNavigate} from 'react-router-dom';
// import axios from 'axios';
// import {motion} from 'framer-motion';

// const MotionImageBox = motion(Box);

// const LoadingMessages = [
//     // ... Existing messages ...
// ];

// const LoadingPage = () => {
//     const [currentMessage, setCurrentMessage] = useState(0);
//     const [albedoImage, setAlbedoImage] = useState(null);
//     const [pbrMapUrls, setPbrMapUrls] = useState({normal: null, height: null, smoothness: null});
//     const navigate = useNavigate();

//     useEffect(() => {
//         const intervalId = setInterval(() => {
//             setCurrentMessage((prev) => (prev + 1) % LoadingMessages.length);
//         }, 4000);

//         return () => clearInterval(intervalId);
//     }, []);

//     // Fetch the most recent albedo image and its material ID
//     useEffect(() => {
//         const fetchRecentAlbedo = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3001/api/get_recent_albedo');
//                 setAlbedoImage(response.data.image_url);
//                 loadPBRMaps(response.data.material_id);
//             } catch (error) {
//                 console.error('Error fetching recent albedo:', error);
//             }
//         };

//         fetchRecentAlbedo();
//     }, []);

//     // Fetch the PBR maps using the material ID
//     const loadPBRMaps = async (materialId) => {
//         const mapTypes = ['normal', 'height', 'smoothness'];
//         const mapPromises = mapTypes.map(mapType => axios.get(`http://localhost:3001/api/get_${mapType}_by_id/${materialId}`));
//         try {
//             const maps = await Promise.all(mapPromises);
//             const newPbrMapUrls = {};
//             mapTypes.forEach((mapType, index) => {
//                 newPbrMapUrls[mapType] = maps[index].data.image_url;
//             });
//             setPbrMapUrls(newPbrMapUrls);
//             navigate('/gallery');
//         } catch (error) {
//             console.error('Error fetching PBR maps:', error);
//         }
//     };

//     return (
//         <Box mt={'10rem'} fontSize={'2xl'} textAlign={'center'}>
//             {albedoImage ? (
//                 <>
//                     <MotionImageBox
//                         whileHover={{scale: 1.05}}
//                         boxShadow="md"
//                         borderRadius="lg"
//                         overflow="hidden"
//                         border="1px solid"
//                         borderColor="gray.200"
//                     >
//                         <Image src={albedoImage} alt="Albedo Texture" boxSize="300px" objectFit="cover" />
//                     </MotionImageBox>
//                     <Heading>Loading PBR Maps...</Heading>
//                     <SimpleGrid columns={[2, null, 3]} spacing="40px">
//                         {['normal', 'height', 'smoothness'].map((type, index) => (
//                             pbrMapUrls[type] ? (
//                                 <MotionImageBox
//                                     key={type}
//                                     whileHover={{scale: 1.05}}
//                                     boxShadow="md"
//                                     borderRadius="lg"
//                                     overflow="hidden"
//                                     border="1px solid"
//                                     borderColor="gray.200"
//                                 >
//                                     <Image src={pbrMapUrls[type]} alt={`${type} Texture`} boxSize="300px" objectFit="cover" />
//                                 </MotionImageBox>
//                             ) : (
//                                 <Skeleton key={index} height="300px" />
//                             )
//                         ))}
//                     </SimpleGrid>
//                 </>
//             ) : (
//                 <Heading>Loading Albedo...</Heading>
//             )}
//             <Text>{LoadingMessages[currentMessage]}</Text>
//             <Spacer p={'1rem'} />
//             <CircularProgress isIndeterminate size='5rem' color='green.300' />
//         </Box>
//     );
// };

// export default LoadingPage;

















// OLD LOADING SCREEN 

// import React, {useEffect, useState} from 'react';
// import {Box, Heading, Text, CircularProgress, Spacer} from '@chakra-ui/react';
// import {useNavigate, useLocation} from 'react-router-dom';
// import axios from 'axios';
// import {useGeneratedImagesStore} from '../store/store';

// const LoadingMessages = [
//     "Connecting to database",
//     "Encoding image files",
//     "Prepping API calls",
//     "Hold tight, your packets are traveling at the speed of light!",
//     // ... more messages ...
// ];

// const LoadingPage = () => {
//     const [currentMessage, setCurrentMessage] = useState(0);
//     const navigate = useNavigate();
//     const location = useLocation();
//     const {materialId} = location.state; // Assuming materialId is passed in state when navigating to this page
//     const {albedoImage, setAlbedoImage} = useGeneratedImagesStore();

//     useEffect(() => {
//         const intervalId = setInterval(() => {
//             setCurrentMessage((prev) => (prev + 1) % LoadingMessages.length);
//         }, 4000); // Change message every 4 seconds

//         return () => clearInterval(intervalId);
//     }, []);

//     useEffect(() => {
//         if (albedoImage) {
//             navigate('/gallery');
//             return;
//         }

//         const fetchAlbedoImage = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:3001/api/get_albedo_by_id/${materialId}`);
//                 setAlbedoImage(response.data.image_url);
//                 navigate('/gallery');
//             } catch (error) {
//                 console.error('Error fetching albedo image:', error);
//             }
//         };

//         if (materialId) {
//             fetchAlbedoImage();
//         }
//     }, [navigate, materialId, albedoImage, setAlbedoImage]);

//     return (
//         <Box mt={'10rem'} fontSize={'2xl'} textAlign={'center'}>
//             <Heading>Loading Albedo...</Heading>
//             <Text>{LoadingMessages[currentMessage]}</Text>
//             <Spacer p={'1rem'} />
//             <CircularProgress isIndeterminate size='5rem' color='green.300' />
//         </Box>
//     );
// };

// export default LoadingPage;
