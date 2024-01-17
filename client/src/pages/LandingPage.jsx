import React, {useEffect} from 'react';
//libs
import {useNavigate, Navigate} from 'react-router-dom';

import {AnimatePresence, motion} from 'framer-motion';
import {Stack, VStack, Box, Button, Heading, Text, ButtonGroup, useColorModeValue} from '@chakra-ui/react';

import {LandingPageText} from '../components';
import '../styles/landingPage.css';
//components


function LandingPage() {
    // const navigate = useNavigate();

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = e.clientX;
            const y = e.clientY;
            const el = document.body;
            const {top: t, left: l, width: w, height: h} = el.getBoundingClientRect();

            el.style.setProperty('--posX', x - l - w / 2);
            el.style.setProperty('--posY', y - t - h / 2);
        };

        document.body.addEventListener('pointermove', handleMouseMove);

        return () => {
            document.body.removeEventListener('pointermove', handleMouseMove);
        };
    }, []);

    return (

        <Box className="background-animation"
            height={'100vh'}
        >
            <LandingPageText />

        </Box>

    );
}

export default LandingPage;