//lib imports
import React, {useEffect} from 'react';
import {Box, VStack, Divider, Center} from '@chakra-ui/react';
import {AnimatePresence, motion, useScroll} from 'framer-motion';

//components
import {LandingPageText, Features} from './components';
import './landingPage.css'

function LandingPageBackground() {
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
            height={'90vh'} width={'100vw'} position={'absolute'} top={0} left={0} zIndex={-1}
        >
        </Box>

    );
}



function LandingPage() {


    return (

        <VStack spacing={0} width={'100vw'} overflow={'hidden'}>
            <Box
                height={'100vh'} width={'100vw'} position={'relative'}
            >
                <LandingPageText />
                <LandingPageBackground />


            </Box>

            <Box position={'relative'} width={'100vw'} marginTop={'-10vh'}>
                <Divider orientation='horizontal' borderWidth={'.25rem'} w={'full'} color='white.800' borderStyle={'solid'} />

                <Features />
            </Box>
        </VStack>

    );
}

export default LandingPage;