import React from 'react'
//libs
import {useNavigate} from 'react-router-dom';

import {motion} from 'framer-motion';
import {Stack, Center, VStack, HStack, Box, Button, Text, Spacer, chakra, Divider} from '@chakra-ui/react';
import {StylishHeader, MotionContainer, StylishButton} from '../../../components';

//fonts
import '@fontsource/poppins';
import '@fontsource/inter';





function LandingPageText() {

    const H1 = {
        bgGradient: "linear(to-l, #7928CA, #FF0080)",
        bgClip: "text",
        letterSpacing: '.15rem',
        fontSize: '7rem',
        textAlign: 'center',
        //textShadow: "1px 1px 1px rgba(0, 0, 0, 0.25)",
        fontFamily: "poppins, sans-serif",
        fontWeight: '900',
    };

    const H2 = {
        bgGradient: "linear(to-r, teal.400, blue.400)",
        bgClip: "text",
        letterSpacing: '.15rem',
        fontSize: '7rem',
        textAlign: 'center',
        //textShadow: "1px 1px 1px rgba(0, 0, 0, 0.25)",
        fontFamily: "poppins, sans-serif",
        fontWeight: '900',
    };

    const detailHeaderStyle = {
        //  bgGradient: "linear(to-r, #9bf8f4, #6f7bf7)",
        color: 'white.800',
        // bgClip: "text",
        // letterSpacing: '.15rem',
        fontSize: '1.9rem',
        textAlign: 'center',
        fontFamily: "poppins, sans-serif",
        fontWeight: '600',

    };






    const navigate = useNavigate();
    const MotionBox = motion(Box);

    return (

        <Box pos="relative" overflow="hidden">
            <Box maxW="7xl" mx="auto">
                <Box pos="relative" w="full" border="solid 1px transparent" >
                    <Box maxW={{base: "7xl", }} mt={'20%'} >

                        <Box textAlign="center" mx="auto" w={'90%'} >
                            <StylishHeader text={"TEXTURE \n FORGE"} sx={H1} />
                            {/* <StylishHeader text={"FORGE"} sx={H2} /> */}
                            {/* <Center>
                                <Divider textAlign={'center'} borderWidth={'.25rem'} width={'full'} color='white.800' borderStyle={'solid'} />
                            </Center> */}
                            <Center>
                                <Text py={'2rem'} sx={detailHeaderStyle} maxW={'xl'} >
                                    Generate, Preview, and Download PBR Textures for 3D Materials
                                </Text>
                            </Center>
                        </Box>
                        <Center>
                            <Divider textAlign={'center'} borderWidth={'.25rem'} maxW={'full'} color='white.800' borderStyle={'solid'} />
                        </Center>

                        <Stack justifyContent="center" py={'2.5rem'} >
                            <HStack justifyContent={'center'}>
                                <StylishButton mr='.5rem' handleClick={() => navigate('/preview')} text="Generate Maps" />
                                <StylishButton ml='.5rem' handleClick={() => navigate('/preview')} text="Download Maps" />
                            </HStack>
                            <Box alignSelf={'center'} mt='5'>
                                <Button colorScheme='white' variant='ghost'>How does it work? What is PBR? </Button>
                            </Box>

                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Box >










    )
}

export default LandingPageText

