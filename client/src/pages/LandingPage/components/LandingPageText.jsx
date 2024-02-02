import React from 'react'
//libs
import {useNavigate, useOutletContext} from 'react-router-dom';

import {motion} from 'framer-motion';
import {Stack, Center, VStack, HStack, useColorModeValue, List, ListItem, ListIcon, Box, Button, Text, Spacer, chakra, Divider} from '@chakra-ui/react';
import {StylishHeader, MotionContainer, StylishButton} from '../../../components';

//fonts
import '@fontsource/poppins';
import '@fontsource/inter';


const colorThemeValues = {
    light: {
        bgMain: "white.800",
        bgDetail: "facebook.600",
        componentMain: "gray.100",
        componentDetail: "gray.200",
        borderMain: "blue.300",
        borderDetail: "twitter.300",
        icon: "teal.300",
        textMain: "gray.600",
        textHeader: "blue.700",
        textDetail: "gray.400",
        highlight: "twitter.400",
        hover: "purple.400",
    },
    dark: {
        bgMain: "gray.800",
        bgDetail: "purple.600",
        componentMain: "gray.700",
        componentDetail: "gray.600",
        borderMain: "purple.800",
        borderDetail: "purple.600",
        icon: "purple.400",
        textMain: "gray.300",
        textHeader: "purple.600",
        textDetail: "gray.600",
        highlight: "purple.300",
        hover: "twitter.400",
    }
};


function LandingPageText() {

    const H1 = {
        bgClip: "text",
        letterSpacing: '-.15rem',

        fontSize: ['1rem', '2rem', '3rem', '4rem'],
        textAlign: 'left',
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

        // bgClip: "text",
        fontSize: '1.8rem',
        fontFamily: "poppins, sans-serif",
        fontWeight: '600',


    };






    const navigate = useNavigate();
    const MotionBox = motion(Box);
    const {onOpen} = useOutletContext()

    return (

        <Box pos="relative" overflow="hidden">
            <Box maxW="7xl" mx="auto">
                <Box pos="relative" w="full"  >
                    <Box
                        mt={'20%'} >

                        <Box mx="auto" maxW={'80%'} >
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
                                    <Text
                                        // color={useColorModeValue('whiteAlpha.800, whiteAlpha.900')}
                                        color={useColorModeValue('whiteAlpha.900', 'whiteAlpha.900')}
                                        textAlign="left" sx={detailHeaderStyle} lineHeight={'150%'} >
                                        ‣ Generate PBR Textures With Text-to-Image AI  <br />
                                        ‣ Get Live Previews Of Your New 3D Materials<br />
                                        ‣ And Download Your Assets — Optimized, Fast, Free <br />
                                    </Text>
                                </Box>
                            </Center>
                        </Box>
                        <Spacer py={'1rem'} />
                        <Center>
                            <Divider textAlign={'center'} borderWidth={'.25rem'} maxW={'xl'}
                                borderStyle={'solid'}
                                borderColor={useColorModeValue('whiteAlpha.400', 'whiteAlpha.400')}
                            />
                        </Center>
                        <Spacer py={'1rem'} />


                        <Stack justifyContent="center" py={'2.5rem'} >
                            <HStack justifyContent={'center'}>
                                <StylishButton


                                    mr='.5rem' handleClick={() => navigate('/preview')} text="Generate Maps" />
                                <StylishButton ml='.5rem' handleClick={() => navigate('/gallery')} text="Download Maps" />
                            </HStack>
                            <Box alignSelf={'center'} py={'2.5rem'}>
                                <Button
                                    variant='outline' onClick={onOpen}
                                    borderRadius={'lg'}
                                    size={{base: 'md', sm: 'md', md: 'md', lg: 'lg'}}
                                    padding={{base: '1.25rem', sm: '1.25rem', md: '1.75rem', lg: '2rem'}}
                                    borderColor={useColorModeValue('whiteAlpha.400', 'whiteAlpha.400')}
                                    color={useColorModeValue('whiteAlpha.800', 'whiteAlpha.900')}
                                    bg='whiteAlpha.200'
                                    _hover={{bg: 'whiteAlpha.300'}}
                                > How does this work? What is 'PBR'? More questions? </Button>
                            </Box>

                        </Stack>
                    </Box>

                </Box>

            </Box>

        </Box >










    )
}

export default LandingPageText

