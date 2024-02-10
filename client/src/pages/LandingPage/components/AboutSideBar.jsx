import React from 'react';
import {FaGithub} from "react-icons/fa6";
import {
    Drawer, Box, HStack, VStack, DrawerOverlay, DrawerContent, DrawerBody,
    DrawerHeader, DrawerCloseButton, Center, useColorModeValue, Icon, Spacer, chakra, LinkBox, LinkOverlay
} from "@chakra-ui/react";
import {color, motion} from 'framer-motion';
import '@fontsource/poppins';
import '@fontsource/inter';
import {Link} from "react-router-dom";
import Timeline from './TimeLine';

const MotionIcon = motion(Icon);
const MotionText = motion(chakra.Text);


const colorThemeValues = {
    light: {
        bgMain: "gray.100",
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
        headerFamily: "poppins, sans-serif",
        bodyFamily: "inter, sans-serif",
        detailFamily: "avenir, sans-serif",
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
        textDetail: "gray.400",
        highlight: "purple.300",
        hover: "twitter.400",
        headerFamily: "poppins, sans-serif",
        bodyFamily: "inter, sans-serif",
        detailFamily: "avenir, sans-serif",
    }
};
const headerStyle = {
    fontWeight: '800',
    letterSpacing: '.2rem',
    lineHeight: '1.35rem',
    textAlign: 'center',
    fontSize: ['xl', '2xl', '3xl', '4xl'],
    fontFamily: 'poppins, sans-serif',
};

const bodyStyle = {
    fontWeight: '200',
    lineHeight: '2rem',
    fontSize: ['lg', 'lg', 'xl', '2xl'],
    fontFamily: 'inter, sans-serif',

};
const AboutSideBar = ({isOpen, onClose}) => {
    return (
        <Drawer closeOnEsc={true} closeOnOverlayClick={true}
            placement='right' isOpen={isOpen} onClose={onClose}
            isFullHeight={true} size={['sm', 'md', 'lg', 'xl']}

        >
            <DrawerOverlay />
            <DrawerContent
                bg={useColorModeValue(colorThemeValues.light.bgMain, colorThemeValues.dark.bgMain)}
            >
                <DrawerCloseButton />
                <DrawerHeader
                    sx={headerStyle} color={useColorModeValue(colorThemeValues.light.textHeader, colorThemeValues.dark.textHeader)}
                    pt='3rem' textAlign={'center'}
                >
                    ABOUT & FAQ:
                </DrawerHeader>
                <DrawerBody>
                    <Timeline />
                    <Spacer py={'1rem'} />
                    <Box
                        padding={{base: '8', sm: '6', md: '12', lg: '16', xl: '20'}}>
                        <Center>

                            <MotionText
                                color={useColorModeValue(colorThemeValues.light.textHeader, colorThemeValues.dark.textHeader)}
                                sx={headerStyle}
                                // variants={textVariants} initial="hidden" animate="visible"
                                textAlign={'center'}
                            >
                                What is 'PBR'?: <br />
                            </MotionText>
                        </Center>
                        <Spacer py={'1.5rem'} />
                        <MotionText sx={bodyStyle}
                            color={useColorModeValue(colorThemeValues.light.textMain, colorThemeValues.dark.textMain)}
                        // variants={textVariants} initial="hidden" animate="visible"
                        >

                            PBR stands for Physically Based Rendering. It's a technique used in computer graphics to render images that mimick the laws of optics and closely resemble the physical properties of real-life surfaces.

                            The core idea behind PBR is to ensure that objects interact with light in a realistic manner, making digital scenes look more believable.<br /><br />

                            PBR uses algorithms (based on real-world equations) to process a set of textures/bitmaps (each analogous to different optical phenomena) to reflect how materials absorb, reflect, refract, scatter, or diffuse light. This can involve:<br /><br />

                            <strong>Base Color</strong>: Captures the true color of a material without shadows or reflections.<br />
                            <strong>Roughness</strong>: Determines the surface's microtexture, influencing how it scatters light.<br />
                            <strong>Metallic</strong>: Define the material's metallic attributes, differentiating between metallic and non-metallic surfaces. <br />
                            <strong>Ambient Occlusion</strong>: Simulates how light is occluded in crevices and corners.<br />
                            <strong>Normal/Height</strong>: Add surface detail by simulating additional geometry. <br />

                            By applying this combination of real-world equations and optically-analagous bitmaps, PBR systems can achieve consistent results under different lighting conditions, making them a standard in creating realistic/photo-realistic 3D visuals.<br /> <br />


                        </MotionText>
                        <Spacer py={'.5rem'} />
                        <Center>
                            <LinkBox mt="4" textAlign="center">
                                <LinkOverlay href='https://github.com/thegrayeminence/material-manager/tree/main' isExternal>
                                    <MotionText
                                        sx={headerStyle}
                                        color={useColorModeValue(colorThemeValues.light.textHeader, colorThemeValues.dark.textHeader)}
                                    // initial="hidden" animate="visible" variants={textVariants}
                                    >
                                        More Info on GitHub:
                                    </MotionText>
                                </LinkOverlay>
                                <Spacer py={'.5rem'} />
                                <MotionIcon
                                    as={FaGithub} w='15%' height={'auto'}
                                    _hover={{transform: 'scale(1.1)'}}

                                    color={useColorModeValue(colorThemeValues.light.icon, colorThemeValues.dark.icon)}
                                // initial="hidden"
                                // animate="visible"
                                // variants={textVariants}
                                />
                            </LinkBox>
                        </Center>
                    </Box>
                </DrawerBody>
            </DrawerContent>
        </Drawer >
    );
};

const textVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {opacity: 1, y: 0, transition: {duration: 0.8}}
};

const iconVariants = {
    hidden: {rotate: -180},
    visible: {rotate: 0, transition: {duration: 0.8}}
};

export default AboutSideBar;