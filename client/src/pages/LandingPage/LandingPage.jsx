//lib imports
import React, {useEffect} from 'react';
import {Box, VStack, Divider, Center, useColorModeValue, Spacer, Container} from '@chakra-ui/react';
import {AnimatePresence, motion, useScroll} from 'framer-motion';

//components
import {LandingPageText, Features, Timeline} from './components';
import {GeometricBackgroundAnimation, SimpleFooter} from '../../components';
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
                bg={useColorModeValue('gray.400', 'gray.800')}


            >

                <Divider textAlign={'center'} borderWidth={'.25rem'} w={'full'}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('blue.400', 'purple.400')}
                />
                <Spacer py={'1.5rem'} />

                {/* Features Section Container  */}
                <Container
                    zIndex={-1}
                    maxW={'80%'}
                    borderRadius={'xl'}
                    boxShadow={'xl'}
                    borderStyle={'solid'}
                    borderWidth={'.15rem'}
                    borderColor={useColorModeValue('blackAlpha.200', 'whiteAlpha.300')}
                    // _hover={{transform: 'scale(1.05)'}} transition={'transform 0.3s'}
                    p={{base: '2', sm: '4', md: '6', lg: '8', xl: '10'}}
                    bg={useColorModeValue('gray.100', 'gray.700')}
                >

                    <Features zIndex={-1}
                    />
                </Container>
                <Spacer py={'3.5rem'} />
                <Container
                    zIndex={-1}
                    maxW={'80%'}
                    borderRadius={'xl'}
                    boxShadow={'xl'}
                    borderStyle={'solid'}
                    borderWidth={'.15rem'}
                    borderColor={useColorModeValue('blackAlpha.200', 'whiteAlpha.300')}
                    // _hover={{transform: 'scale(1.05)'}} transition={'transform 0.3s'}
                    p={{base: '2', sm: '4', md: '6', lg: '8', xl: '10'}}
                    bg={useColorModeValue('gray.100', 'gray.700')}
                >

                    <Timeline zIndex={-1}
                    />
                </Container>

                <Spacer py={'3.5rem'} />
                <SimpleFooter />
                <Spacer py={'.5rem'} />
                <Divider textAlign={'center'} borderWidth={'.25rem'} w={'full'}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('blue.400', 'purple.400')}
                />

            </Box>

        </VStack >

    );
}

export default LandingPage;