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
        bgClip: "text",
        lineHeight: '75%',
        letterSpacing: '-.5rem',
        fontSize: ['2rem', '3rem', '4rem', '5rem'],
        textAlign: 'center',
        textShadow: "1px 1px 1px rgba(0, 0, 0, 0.25)",
        fontFamily: "arial, sans-serif",
        fontWeight: '900',

    };
    const linearGradients = (index, dir) => {
        const d = dir
        const i = index
        console.log(index)
        const gradientsArray = [
            `linear(to-${d}, #7928CA, #FF0080)`,
            `linear(to-${d}, #40c9ff, #e81cff)`,
            `linear(to-${d}, #f9c58d, #f492f0)`,
            `linear(to-${d}, #57ebde, #aefb2a)`,
            `linear(to-${d}, #f6d5f7, #fbe9d7)`,
            `linear(to-${d}, #6274e7, #8752a3)`,
            `linear(to-${d}, #9491e2, #aff2d8)`,
            `linear(to-${d}, #9bf8f4, #6f7bf7)`,
            `linear(to-${d}, #f6d5f7, #fbe9d7)`,
            `linear(to-${d}, #6274e7, #8752a3)`,
            `linear(to-${d}, #9491e2, #aff2d8)`]

        return (
            gradientsArray[i]
        )
    }
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

    const H3 = {
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
                <Box pos="relative" w="full"  >
                    <Box maxW={{base: "7xl", }} mt={'20%'} >

                        <Box mx="auto" w={'90%'} >
                            {/* site logo */}
                            <Box as="span" position="fixed" top={0} left={0} maxW={'25vw'} >
                                <VStack >
                                    <StylishHeader
                                        bgGradient={linearGradients(1, 'r')}
                                        text={"TEXTURE"} sx={H1} />
                                    <StylishHeader
                                        bgGradient={linearGradients(1, 'l')}
                                        text={"FORGE"} sx={H1} />
                                </VStack>
                            </Box>
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
                                <StylishButton ml='.5rem' handleClick={() => navigate('/gallery')} text="Download Maps" />
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

