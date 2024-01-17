import React from 'react'
//libs
import {Outlet, useNavigate, Navigate} from 'react-router-dom';

import {motion} from 'framer-motion';
import {Stack, VStack, Box, Button, Text, Heading, ButtonGroup, useColorModeValue} from '@chakra-ui/react';


const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionText = motion(Text);
const MotionHeading = motion(Heading);
const GradientButton = motion(Button);

export const ManageMaterialsButton = (props, text) => {
    const navigate = useNavigate();
    return (
        <GradientButton
            onClick={() => navigate('/preview')}
            // color={useColorModeValue('whiteAlpha.800', 'whiteAlpha.900')}
            // bg={useColorModeValue('twitter.500', 'purple.600')}
            size="lg"
            bgGradient="linear(to-r, teal.500, green.500)"
            color="white"
            boxShadow="0px 1px 25px -5px rgb(66 153 225 / 50%), 0 10px 10px -5px rgb(66 153 225 / 40%)"
            _hover={{bgGradient: "linear(to-r, teal.400, green.400)"}}
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            {...props}
        >
            {text}
        </GradientButton>
    );
};



export const GradientText = (props) => {
    return (
        <MotionText
            color="gray.600"
            fontSize="xl"
            fontWeight="bold"
            textAlign="center"
            textShadow="1px 1px 2px rgba(0, 0, 0, 0.2)"
            {...props}
        />
    );
};

export const GradientHeading = (props) => {
    return (
        <MotionHeading
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontSize="6xl"
            fontWeight="extrabold"
            textAlign="center"
            letterSpacing="wide"
            textShadow="2px 2px 2px rgba(0, 0, 0, 0.3)"
            {...props}
        />
    );
};



function LandingPageText() {
    const navigate = useNavigate();
    // Continuous subtle animations for text and button
    const textMotion = {
        animate: {
            y: [0, -10, 0],
            transition: {
                duration: 4,
                ease: "easeInOut",
                loop: Infinity,
            }
        }
    };

    const buttonMotion = {
        animate: {
            scale: [1, 1.05, 1],
            transition: {
                duration: 3,
                ease: "easeInOut",
                loop: Infinity,
            }
        }
    };




    return (
        <>




            <MotionBox
                position="relative"

                overflow="hidden"
                minH="100vh"
                width="100vw"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                initial="initial"
                animate="animate"

            >
                <Stack direction='column' >
                    <MotionHeading
                        // color={useColorModeValue('twitter.500', 'purple.600')}
                        // color={useColorModeValue('linear(to-r, pink.400, purple.600)', 'linear(to-r, purple.200, blue.600)')}
                        bgGradient="linear(to-l, #7928CA, #FF0080)"
                        bgClip="text"
                        letterSpacing={'.5rem'}
                        fontSize='4rem'
                        textAlign={'center'}
                        py={'2rem'}
                        textShadow="2px 2px 2px rgba(0, 0, 0, 0.3)"
                        fontFamily={'avenir'}
                        fontWeight='extrabold'
                        variants={textMotion}
                        initial="initial" animate="animate"
                    >
                        ProxyShader:
                    </MotionHeading>
                    <MotionHeading
                        // color={useColorModeValue('twitter.500', 'purple.600')}
                        bgGradient="linear(to-l, #7928CA, #FF0080)"
                        bgClip="text"
                        letterSpacing={'.15rem'}
                        fontSize='2rem'
                        textAlign={'center'}
                        py={'.15rem'}
                        // textShadow="2px 2px 2px rgba(0, 0, 0, 0.3)"
                        fontFamily={'avenir'}
                        fontWeight='medium'
                        variants={textMotion}
                        initial="initial" animate="animate"
                    >
                        Generate Placeholder Materials for PBR Workflows
                    </MotionHeading>

                    <VStack spacing="4" py={'3.5rem'}>

                        {ManageMaterialsButton({variants: buttonMotion}, 'Manage Materials')}
                    </VStack>
                </Stack>
            </MotionBox>

        </>
    )
}

export default LandingPageText

