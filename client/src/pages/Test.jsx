import React, {useEffect, useState} from 'react';
import {Box, Heading, useToast, Text, Flex, CircularProgress, Center, Spacer, VStack, useColorModeValue} from '@chakra-ui/react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {SimpleFooter, LightBarBackground, GradientBG_Purple} from '../components';
// import './LandingPage/landingPage.scss';

function Test() {
    return (

        <Box height={'100vh'} width={'100vw'} position={'relative'}>
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
            {/* <SimpleFooter /> */}
            <Spacer h='80px' />
        </Box>
    )
}

export default Test