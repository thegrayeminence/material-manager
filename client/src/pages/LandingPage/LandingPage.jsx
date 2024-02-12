//lib imports
import React, {useEffect} from 'react';
import {Box, VStack, Divider, Center, useColorModeValue} from '@chakra-ui/react';
import {AnimatePresence, motion, useScroll} from 'framer-motion';
import {Timeline} from './components';

//components
import {LandingPageText, Features} from './components';
import {GeometricBackgroundAnimation} from '../../components';
import './landingPage.scss'

function LandingPageBackground() {

    return (


        <Box
            // className="background-animation-2"
            bg={useColorModeValue('gray.900', 'black')}

            height={'100vh'} width={'100vw'} position={'absolute'}
            top={0} left={0} zIndex={-1}
        >
            <GeometricBackgroundAnimation />
        </Box>

    );
}

function LandingPageBottomBackground() {

    // useEffect(() => {
    //     const handleMouseMove = (e) => {
    //         const x = e.clientX;
    //         const y = e.clientY;
    //         const el = document.body;
    //         const {top: t, left: l, width: w, height: h} = el.getBoundingClientRect();

    //         el.style.setProperty('--posX', x - l - w / 2);
    //         el.style.setProperty('--posY', y - t - h / 2);
    //     };

    //     document.body.addEventListener('pointermove', handleMouseMove);

    //     return () => {
    //         document.body.removeEventListener('pointermove', handleMouseMove);
    //     };
    // }, []);

    return (
        <Box className="background-animation"
            height={'100vh'}
            width={'100vw'}
            position={'absolute'}
            top={0} left={0}
            zIndex={-1}

            opacity={useColorModeValue('.4', '.6')}
            backgroundBlendMode={'soft-light'}
        // backdropFilter={'blur(20px)'}

        >

        </Box>

    )
}



function LandingPage() {


    return (

        <VStack
            spacing={0}
            width={'100vw'}
        // top={0} left={0}
        >
            <Box
                height={'100vh'}
                width={'100%'}
                position={'relative'}
            >
                <LandingPageText />
                <LandingPageBackground />
                <LandingPageBottomBackground />


            </Box>

            <Box
                height={'auto'}
                width={'100vw'}
                position={'relative'}
                bg={useColorModeValue('whiteAlpha.300', 'blackAlpha.600')}


            >

                <Divider textAlign={'center'} borderWidth={'.25rem'} w={'full'}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('blue.400', 'purple.400')}
                />
                <Features
                />

            </Box>

        </VStack>

    );
}

export default LandingPage;