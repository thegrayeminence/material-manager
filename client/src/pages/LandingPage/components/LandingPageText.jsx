import React from 'react'
//libs
import {useNavigate} from 'react-router-dom';

import {motion} from 'framer-motion';
import {Stack, VStack, HStack, Box, Button, Text, Spacer} from '@chakra-ui/react';
import {StylishHeader, MotionContainer, StylishButton} from '../../../components';

//fonts
import '@fontsource/poppins';
import '@fontsource/inter';





function LandingPageText() {

    const HeaderStyle = {
        bgGradient: "linear(to-l, #7928CA, #FF0080)",
        bgClip: "text",
        letterSpacing: '.35rem',
        fontSize: '6rem',
        textAlign: 'center',
        // textShadow: "1px 1px 1px rgba(0, 0, 0, 0.25)",
        fontFamily: "inter, sans-serif",
        fontWeight: '900',
    };

    const detailHeaderStyle = {
        bgGradient: "linear(to-r, #9bf8f4, #6f7bf7)",
        bgClip: "text",
        letterSpacing: '.15rem',
        fontSize: '2.15rem',
        textAlign: 'center',
        //textShadow: "2px 2px 2px rgba(0, 0, 0, 0.1)",
        fontFamily: "poppins, sans-serif",
        fontWeight: '600',

    };






    const navigate = useNavigate();
    const MotionBox = motion(Box);

    return (




        <Box width='100vw' h='100vh'>
            <MotionBox
                position="relative"
                h='100%'
                ml='10%'
                w="80%"
                display="flex"
                justifyContent="center"
                flexDirection="column"
                initial='initial'
                animate='animate'
            >

                <Box >
                    <StylishHeader text="TEXTURE FORGE" sx={HeaderStyle} />
                    <Spacer py={'.25rem'} />
                    <StylishHeader text="GENERATE/DOWNLOAD/PREVIEW TEXTURE MAPS FOR PBR MATERIALS" sx={detailHeaderStyle} />
                    <Spacer py={'2.5rem'} />
                </Box>
                <HStack justifyContent={'center'}>
                    <StylishButton mr='.5rem' handleClick={() => navigate('/preview')} text="Generate Maps" />
                    <StylishButton ml='.5rem' handleClick={() => navigate('/preview')} text="Download Maps" />
                </HStack>
                <Box alignSelf={'center'} mt='5'>
                    <Button variant='ghost'>Questions?</Button>
                </Box>
            </MotionBox>

        </Box>

    )
}

export default LandingPageText

