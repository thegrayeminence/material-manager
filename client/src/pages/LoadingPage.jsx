import React, {useEffect, useState} from 'react';
import {Box, Heading, Text, CircularProgress, Spacer} from "@chakra-ui/react";
import {useGeneratedImagesStore} from '../store/store';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';


const LoadingMessages = [
    "Connecting to database",
    "Encoding image files",
    "Prepping API calls",
    "Hold tight, your packets are traveling at the speed of light!",
    // ... more messages ...
];

const LoadingPage = () => {
    const [currentMessage, setCurrentMessage] = useState(0);
    const {generatedImages} = useGeneratedImagesStore();
    const navigate = useNavigate();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentMessage((prev) => (prev + 1) % LoadingMessages.length);
        }, 4000); // Change message every 4 seconds

        return () => clearInterval(intervalId);
    }, []);


    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/get_recent_albedo');
                if (response.data.image_urls.length && typeof response.data.image_urls === 'string') { // Check if albedo is loaded first
                    navigate('/gallery'); // Or the appropriate display page
                    clearInterval(intervalId);
                }
            } catch (error) {
                console.error('Error fetching recent maps:', error);
            }
        }, 2000); // Poll every 2 seconds

        return () => clearInterval(intervalId);
    }, [navigate]);


    return (
        <Box mt={'10rem'} fontSize={'2xl'} textAlign={'center'}>
            <Heading>Loading Albedo...</Heading>
            <Text>{LoadingMessages[currentMessage]}</Text>
            <Spacer p={'1rem'} />
            <CircularProgress isIndeterminate size='5rem' color='green.300' />
        </Box>
    );
}

export default LoadingPage;
