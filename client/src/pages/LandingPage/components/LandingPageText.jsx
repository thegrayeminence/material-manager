import React from 'react'
//libs
import {useNavigate, useOutletContext} from 'react-router-dom';

import {motion} from 'framer-motion';
import {Stack, Center, VStack, HStack, useColorModeValue, List, ListItem, ListIcon, Box, Button, Text, Spacer, chakra, Divider} from '@chakra-ui/react';
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
        fontFamily: "inter black, sans-serif",
        fontWeight: '900',
        whiteSpace: 'normal',

    };
    const linearGradients = (index, dir) => {
        const d = dir
        const i = index
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
        fontSize: ['1rem', '1.5rem', '2rem', '2.5rem'],
        fontFamily: "poppins, sans-serif",
        fontWeight: '600',
        whiteSpace: 'preserve-spaces',
        textAlign: 'left',



    };






    const navigate = useNavigate();
    const {onOpen} = useOutletContext()

    return (

        <Box pos="relative">
            <Box maxW="7xl" mx="auto" >
                <Box pos="relative" w="full"  >
                    <Box
                        mt={{base: '30%', sm: '30%', md: '25%', lg: '20%', xl: '20%'}}

                        // px='1rem'
                        px={{base: '1rem', sm: '1rem', md: '1rem', lg: '1rem', xl: '1rem'}}

                    >

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
                                        color={useColorModeValue('whiteAlpha.900', 'whiteAlpha.900')}
                                        textAlign="left" sx={detailHeaderStyle} lineHeight={'150%'}

                                    >
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


                                    mr='.5rem' handleClick={() => navigate('/preview')} text="MATERIAL MAKER" />
                                <StylishButton overflow='clip' ml='.5rem' handleClick={() => navigate('/gallery')} text={`MATERIAL GALLERY`} />
                            </HStack>

                            <Box alignSelf={'center'} py={'2.5rem'} maxW='80%' >
                                <Center>
                                    <Button

                                        variant='outline'
                                        width='full'
                                        onClick={onOpen}
                                        borderRadius={'lg'}
                                        overflow={'clip'}
                                        paddingY={['2rem', '2rem', '2.5rem', '3rem']}
                                        paddingX={['1rem', '1rem', '1.5rem', '2rem']}
                                        fontWeight={'600'}
                                        letterSpacing={'wide'}
                                        whiteSpace={'preserve-spaces'}
                                        boxShadow={'base'}

                                        fontFamily={'inter black, sans-serif'}
                                        fontSize={{base: 'md', sm: 'md', md: 'lg', lg: 'lg', xl: 'xl'}}

                                        // borderColor={useColorModeValue('twitter', 'purple')}
                                        textColor={useColorModeValue('green.200', 'violet')}
                                        bg={useColorModeValue('blackAlpha.500', 'blackAlpha.500')}
                                        _hover={{
                                            bg: useColorModeValue('whiteAlpha.500', 'whiteAlpha.400'),
                                            textColor: useColorModeValue('orange.300', 'pink.200'),
                                            // bg: "<color>"
                                        }}


                                    // textShadow=".2px .2px 0 rgba(0, 0, 0, 0.5), -.2px -.2px 0 rgba(0, 0, 0, 0.5), .2px -.2px 0 rgba(0, 0, 0, 0.5), -.2px .2px 0 rgba(0, 0, 0, 0.5)"
                                    > How does this work? <br /> What is 'PBR'? </Button>



                                </Center>
                            </Box>
                        </Stack>
                    </Box>

                </Box>

            </Box>

        </Box >










    )
}

export default LandingPageText

