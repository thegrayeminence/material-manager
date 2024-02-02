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
                            <strong>P</strong>hysically <strong>B</strong>ased <strong>R</strong>endering is a method
                            in which real-world equations and bitmaps are employed in unison to realistically
                            simulate the way that light interacts with surfaces and environments. <br /> <br />
                            In PBR systems, a set of complementary bitmaps (typically between 4-7) are connected to specific inputs in a parent material.
                            Each texture map corresponds a different channel of information,
                            analagous to a specific category of optimical phenomena—e.g. diffuse light (albedo and baseColor maps),
                            reflectivity (roughness and spec maps), environmental shadows (ao maps), and surface-geometry details (normal and height maps).
                            <br /> <br />
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