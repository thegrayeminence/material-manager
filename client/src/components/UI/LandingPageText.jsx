import React from 'react'
//libs
import {Outlet, useNavigate, Navigate} from 'react-router-dom';

import {motion} from 'framer-motion';
import {Stack, VStack, Box, Button, Text, ButtonGroup, useColorModeValue} from '@chakra-ui/react';


const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionText = motion(Text);



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
                mt='-2.5rem'
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
                <MotionText
                    color={useColorModeValue('twitter.500', 'purple.600')}
                    fontSize="4xl" mb="4" fontWeight="bold" variants={textMotion}
                    initial="initial" animate="animate"
                >
                    Material Manager: Preview and Rename Assets
                </MotionText>

                <VStack spacing="4">
                    <MotionButton
                        onClick={() => navigate('/preview')}
                        color={useColorModeValue('whiteAlpha.800', 'whiteAlpha.900')}
                        bg={useColorModeValue('twitter.500', 'purple.600')}
                        size="lg"
                        variants={buttonMotion}
                        initial="initial"
                        animate="animate"
                        boxShadow="md"
                        borderRadius="lg"
                        border="1px solid"
                        borderColor={useColorModeValue('twitter.300', 'purple.400')}
                    >
                        Manage Materials
                    </MotionButton>
                </VStack>
            </MotionBox>

        </>
    )
}

export default LandingPageText

