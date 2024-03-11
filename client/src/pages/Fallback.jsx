import React, {useEffect, useState} from 'react';
import {Box, Heading, useToast, Text, Flex, CircularProgress, Center, Spacer, VStack, useColorModeValue} from '@chakra-ui/react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {SimpleFooter, LightBarBackground, GradientBG_Purple} from '../components'
import {useRouteError} from "react-router-dom";
// import ErrorPage from './ErrorPage';
// import './LandingPage/landingPage.scss';

export default function Fallback() {

    const error = useRouteError();
    console.error(error);
    return (

        <Box height={'100vh'} width={'100vw'} position={'relative'}>

            <Box
                width='full' h='100%'
                opacity={'99.9%'}
                // backgroundBlendMode={'difference'}
                position={'relative'}


            >
                <VStack position='relative' pt='15rem' spacing={0} overflow={'hidden'} maxW='90vw' mx='auto'>
                    <Box fontSize={'2xl'} textAlign={'center'} id="error-page">

                        <Heading>Loading...</Heading>

                        {/* <Text>...</Text> */}
                        <Spacer p={'1rem'} />

                        <CircularProgress isIndeterminate size='5rem' color='green.300' />
                        <Spacer p={'.5rem'} />

                        <Text>
                            {error && (<i>{error.statusText || error.message}</i>)}
                        </Text>

                    </Box>
                </VStack>
            </Box>
            <Box
                height={'100%'} width={'100%'} position={'absolute'}
                top={0} left={0} zIndex={-1}
            >
                {/* <ParticlesBGAnimation /> */}

                <LightBarBackground />
                {/* <GradientBG_Purple /> */}
                {/* <Box className="background-animation"></Box> */}
                {/* <WavesBackgroundAnimation /> */}
            </Box>
        </Box>
    )
}

// Component.displayName = "FallbackPage";