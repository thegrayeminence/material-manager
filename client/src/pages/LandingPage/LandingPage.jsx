//lib imports
import React, {useEffect} from 'react';
import {Box, VStack, Divider, Center, useColorModeValue} from '@chakra-ui/react';
import {AnimatePresence, motion, useScroll} from 'framer-motion';
import {Timeline} from './components';

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
            height={'80vh'} width={'100vw'} position={'absolute'} top={0} left={0} zIndex={-1}
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

            <Box position={'relative'} width={'100vw'} marginTop={'-20vh'}
                bg={useColorModeValue('gray.300', 'gray.700')}
            >
                <Divider textAlign={'center'} borderWidth={'.25rem'} w={'full'}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('blue.400', 'purple.400')}
                />
                <Features />
            </Box>
        </VStack>

    );
}

export default LandingPage;