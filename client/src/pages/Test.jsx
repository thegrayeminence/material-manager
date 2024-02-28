import React, {useEffect, useState} from 'react';
import {Box, Heading, useToast, Text, Flex, CircularProgress, Center, Spacer, VStack, useColorModeValue} from '@chakra-ui/react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {ParticlesBGAnimation, SimpleFooter} from '../components';


function Test() {
    return (

        <Box height={'100vh'} width={'100vw'} position={'relative'}>
            <Box
                height={'100%'} width={'100%'} position={'absolute'}
                top={0} left={0} zIndex={-1}
            >
                <ParticlesBGAnimation />
            </Box>
            <SimpleFooter />
        </Box>
    )
}

export default Test