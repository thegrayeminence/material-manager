//lib imports
import React, {useEffect} from 'react';
import {Box, VStack, Divider, Center, useColorModeValue, Spacer, Container} from '@chakra-ui/react';
import {AnimatePresence, motion, useScroll} from 'framer-motion';

//components
import {LandingPageText, Features, Timeline} from './components';
import {GeometricBackgroundAnimation, SimpleFooter} from '../../components';
import './landingPage.scss'

function BackgroundGradient() {
    return (
        <Box className="background-animation"
            height={'100%'}
            width={'100vw'}
            position={'absolute'}
            bottom={0} left={0}
            zIndex={-1}
            opacity={useColorModeValue('.1', '.6')}
            backgroundBlendMode={useColorModeValue('screen', 'soft-light, hue, multiply')}
            // backdropFilter="blur(10px)"
            filter={'blur(15px)'}
        >
        </Box>
    )
}

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

    return (
        <Box className="background-animation"
            height={'100vh'}
            width={'100vw'}
            position={'absolute'}
            top={0} left={0}
            zIndex={-1}

            opacity={useColorModeValue('.4', '.6')}
            backgroundBlendMode={'soft-light'}
        //backdropFilter={'blur(20px)'}
        >

        </Box>

    )
}



function LandingPage() {


    return (

        <VStack
            spacing={0}
            width={'100vw'}
            position={'relative'}
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
                zIndex={-2}
                bg={useColorModeValue('facebook.200', 'gray.800')}

            >

                <Divider textAlign={'center'} borderWidth={'.25rem'} w={'full'}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('blue.400', 'purple.400')}
                />
                <Spacer py={'1.5rem'} />

                {/* Features Section Container  */}
                <Container
                    zIndex={-1}
                    maxW={'90vw'}
                    borderRadius={'xl'}
                    boxShadow={'xl'}
                    borderStyle={'solid'}
                    borderWidth={'.15rem'}
                    borderColor={useColorModeValue('twitter.200', 'purple.300')}
                    // _hover={{transform: 'scale(1.05)'}} transition={'transform 0.3s'}
                    p={{base: '2', sm: '4', md: '6', lg: '8', xl: '10'}}
                    bg={useColorModeValue('gray.100', 'gray.700')}
                >

                    <Features zIndex={-1}
                    />
                </Container>
                <Spacer py={'3.5rem'} />
                {/* <Container
                    zIndex={-1}
                    maxW={'90vw'}
                    // borderRadius={'xl'}
                    // boxShadow={'2xl'}
                    // borderStyle={'solid'}
                    // borderWidth={'.075rem'}
                    // borderColor={useColorModeValue('twitter.200', 'purple.300')}
                    p={{base: '2', sm: '4', md: '6', lg: '8', xl: '10'}}
                // bg={useColorModeValue('gray.200', 'gray.700')}

                >

                    <Timeline zIndex={-1}
                    />
                </Container> */}

                <BackgroundGradient />




            </Box>
            <Spacer h='80px' />

        </VStack >

    );
}

export default LandingPage;