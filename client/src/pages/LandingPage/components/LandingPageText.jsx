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
        letterSpacing: '-.15rem',

        fontSize: ['1rem', '2rem', '3rem', '4rem'],
        textAlign: 'left',
        // textShadow: "0 0 1px rgba(255, 255, 255, 0.8), 0 0 2px rgba(255, 255, 255, 0.1)", // Glowing effect
        // textShadow: ` 0 0 .5px #7928CA, /* Glowing effect for the first color */ 0 0 .5px #FF0080, /* Glowing effect for the second color */ 0 0 .5px #7928CA, /* Enhanced glowing effect for the first color */ 0 0 .5px #FF0080 /* Enhanced glowing effect for the second color */ `,
        fontFamily: "inter black, sans-serif",
        fontWeight: '900',
        whiteSpace: 'nowrap',

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
        color: 'white.800',
        // bgClip: "text",
        fontSize: '1.8rem',
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
                            <Center>
                                {/* site logo */}
                                <Box as="span" position="absolute" mt={'-20%'} maxW={'20vw'} >

                                    <VStack  >

                                        <StylishHeader

                                            bgGradient={linearGradients(0, 'l')}
                                            text={"TEXTURE"} sx={H1} />
                                        <StylishHeader
                                            mt={'-1.5rem'}
                                            bgGradient={linearGradients(1, 'l')}
                                            text={"FORGE"} sx={H1} />

                                    </VStack>
                                </Box>
                            </Center>
                            <Center>
                                <Box>
                                    <Text textAlign="left" sx={detailHeaderStyle} lineHeight={'150%'} >
                                        Generate PBR Textures With Text-to-Image AI  <br />
                                        Get Live Previews Of Your New 3D Materials<br />
                                        And Download Your Assets — Optimized, Fast, Free <br />
                                    </Text>
                                </Box>
                            </Center>
                        </Box>
                        <Spacer py={'1rem'} />
                        <Center>
                            <Divider textAlign={'center'} borderWidth={'.25rem'} maxW={'xl'} color='white.800' borderStyle={'solid'} />
                        </Center>
                        <Spacer py={'1rem'} />


                        <Stack justifyContent="center" py={'2.5rem'} >
                            <HStack justifyContent={'center'}>
                                <StylishButton mr='.5rem' handleClick={() => navigate('/preview')} text="Generate Maps" />
                                <StylishButton ml='.5rem' handleClick={() => navigate('/gallery')} text="Download Maps" />
                            </HStack>
                            <Box alignSelf={'center'} mt='5' py={'1rem'}>
                                <Button colorScheme='white' variant='ghost'> How does this work? What is PBR? And text-to-image AI? </Button>
                            </Box>

                        </Stack>
                    </Box>

                </Box>

            </Box>

        </Box >










    )
}

export default LandingPageText

