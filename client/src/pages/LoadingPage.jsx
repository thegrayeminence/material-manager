import React, {useEffect, useState} from 'react';
import {Box, Heading, Text, CircularProgress, Spacer} from '@chakra-ui/react';
import {useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import {useGeneratedImagesStore} from '../store/store';


const LoadingMessages = [
    "Connecting to database",
    "Encoding image files",
    "Prepping API calls",
    "Hold tight, your packets are traveling at the speed of light!",
    // ... more messages ...
];
const LoadingPage = () => {
    const [currentMessage, setCurrentMessage] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const {materialId} = location.state; // Assuming materialId is passed in state when navigating to this page
    const {albedoImage, setAlbedoImage} = useGeneratedImagesStore();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentMessage((prev) => (prev + 1) % LoadingMessages.length);
        }, 4000); // Change message every 4 seconds

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (albedoImage) {
            navigate('/gallery');
            return;
        }

        const fetchAlbedoImage = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/get_albedo_by_id/${materialId}`);
                setAlbedoImage(response.data.image_url);
                navigate('/gallery');
            } catch (error) {
                console.error('Error fetching albedo image:', error);
            }
        };

        if (materialId) {
            fetchAlbedoImage();
        }
    }, [navigate, materialId, albedoImage, setAlbedoImage]);

    return (
        <Box mt={'10rem'} fontSize={'2xl'} textAlign={'center'}>
            <Heading>Loading Albedo...</Heading>
            <Text>{LoadingMessages[currentMessage]}</Text>
            <Spacer p={'1rem'} />
            <CircularProgress isIndeterminate size='5rem' color='green.300' />
        </Box>
    );
};

export default LoadingPage;