import React from 'react'
//libs
import {Outlet, useNavigate, Navigate} from 'react-router-dom';

import {AnimatePresence, motion} from 'framer-motion';
import {Stack, VStack, Box, Button, Text, ButtonGroup, useColorModeValue} from '@chakra-ui/react';


//components

const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionText = motion(Text);

function LandingPage() {
    const navigate = useNavigate();

    // Background animation variants
    const backgroundVariants = {
        animate: {
            background: [
                "linear-gradient(135deg, rgba(224, 9, 153, 0.7), rgba(208, 14, 222, 0.7))",
                "linear-gradient(135deg, rgba(158, 0, 255, 0.7), rgba(14, 222, 221, 0.7))",
                "linear-gradient(135deg, rgba(224, 9, 153, 0.7), rgba(208, 14, 222, 0.7))"
            ],
            transition: {
                duration: 20,
                ease: "linear",
                loop: Infinity,
            }
        }
    };

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
            variants={backgroundVariants}
            initial="initial"
            animate="animate"
        >
            <MotionText fontSize="4xl" mb="4" fontWeight="bold" variants={textMotion} initial="initial" animate="animate">
                Material Manager: Preview and Rename Assets
            </MotionText>

            <VStack spacing="4">
                <MotionButton
                    onClick={() => navigate('/preview')}
                    colorScheme="teal"
                    size="lg"
                    variants={buttonMotion}
                    initial="initial"
                    animate="animate"
                >
                    Manage Materials
                </MotionButton>
            </VStack>
        </MotionBox>
    )
}

export default LandingPage