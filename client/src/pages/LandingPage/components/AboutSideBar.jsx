import React from 'react';
import {FaGithub} from "react-icons/fa6";
import {
    Drawer, Box, HStack, VStack, DrawerOverlay, DrawerContent, DrawerBody,
    DrawerHeader, Container, DrawerCloseButton, Center, useColorModeValue, Icon, Divider, Spacer, chakra, LinkBox, LinkOverlay, Text,
} from "@chakra-ui/react";
import {color, motion} from 'framer-motion';
import '@fontsource/poppins';
import '@fontsource/inter';
import {Link} from "react-router-dom";
import Timeline from './TimeLine';

const MotionIcon = motion(Icon);
const MotionText = motion(chakra.text);

const textVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {opacity: 1, y: 0, transition: {duration: 0.8}}
};

const iconVariants = {
    hidden: {rotate: -180},
    visible: {rotate: 0, transition: {duration: 0.8}}
};

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
    lineHeight: '2.25rem',
    fontSize: ['lg', 'lg', 'xl', '2xl'],
    fontFamily: 'inter, sans-serif',

};
const AboutSideBar = ({isOpen, onClose}) => {
    return (
        <Drawer closeOnEsc={true} closeOnOverlayClick={true}
            placement='right' isOpen={isOpen} onClose={onClose}
            isFullHeight={true} size={['sm', 'md', 'xl', 'xl']}

            z-index={1000}
        >
            <DrawerOverlay />
            <DrawerContent
                bg={useColorModeValue('gray.200', 'gray.800')}
            >
                <DrawerCloseButton />
                <DrawerHeader
                    sx={headerStyle} color={useColorModeValue(colorThemeValues.light.textHeader, colorThemeValues.dark.textHeader)}
                    pt='3rem' textAlign={'center'}
                >
                    ABOUT & FAQ:
                </DrawerHeader>

                <DrawerBody >

                    <Timeline />

                    <Spacer py={'1rem'} />

                    <Divider
                        textAlign={'center'} borderWidth={'.2rem'} w={'90%'}
                        mx='auto'
                        borderStyle={'solid'}
                        borderColor={useColorModeValue('teal.400', 'facebook.600')}
                    />

                    <Box
                        padding={{base: '8', sm: '6', md: '12', lg: '16', xl: '20'}}>


                        <Center>


                            <MotionText
                                color={useColorModeValue(colorThemeValues.light.textHeader, colorThemeValues.dark.textHeader)}
                                sx={headerStyle}
                                textAlign={'center'}
                            >
                                What is 'PBR'?: <br />
                            </MotionText>
                        </Center>

                        <Spacer py={'1.5rem'} />

                        {/* Container for floating box effect for 'what is pbr' */}

                        <Container
                        // borderRadius={'lg'}
                        // boxShadow={'base'}
                        // w='full'
                        // p={{base: '2', sm: '4', md: '6', lg: '8', xl: '10'}}
                        // bg={useColorModeValue('gray.200', colorThemeValues.dark.componentMain)}
                        >
                            <MotionText sx={bodyStyle}
                                color={useColorModeValue(colorThemeValues.light.textMain, colorThemeValues.dark.textMain)}
                            // variants={textVariants} initial="hidden" animate="visible"


                            >
                                <br />
                                In the context of computer graphics, Physically Based Rendering is a technical approach that aims to generate predictable/stable/photorealistic results by approximating the real-world behavior/interactions between light rays (as defined by equations fed to the engine) and surface matter (as described by texture maps fed to the material) in a virtual space. <br /><br />

                                The core idea behind PBR is to ensure that virtual rays in a scene interact with 3D objects/surfaces as they would outside of the computer.

                                To achieve this, PBR engines use mathematical models (based on real-world equations) to process a set of pre-configured textures/bitmaps (each analogous to different optical phenomena) to define how materials should absorb, reflect, refract, scatter, or diffuse light. This can involve:<br /><br />

                                <strong>Base Color</strong>:<br /> Captures the true color of a material without shadows or reflections.<br />
                                <strong>Roughness</strong>:<br /> Determines the surface's microtexture, influencing how it scatters light.<br />
                                <strong>Metallic</strong>:<br /> Defines the material's metallic attributes, differentiating between metallic and non-metallic (i.e. insulators/dielectric) surfaces. <br />
                                <strong>Ambient Occlusion</strong>:<br /> Simulates how light is occluded in crevices and corners.<br />
                                <strong>Normals/Height</strong>:<br /> Add surface detail by simulating additional geometry. <br />
                                <br />
                                <br />
                                For more in-depth documentation on PBR systems, see: <br />
                                <center>
                                    <a href="https://reference.wolfram.com/language/tutorial/PhysicallyBasedRendering.html">Wolfram Guide</a>
                                </center>

                                <center>
                                    <a href="https://creativecloud.adobe.com/learn/substance-3d-designer/web/the-pbr-guide-part-1">Adobe Guide</a>
                                </center>
                                <br />




                            </MotionText>
                            <Divider
                                textAlign={'center'} borderWidth={'.2rem'} w={'100%'}
                                mx='auto'
                                borderStyle={'solid'}
                                borderColor={useColorModeValue('teal.400', 'facebook.600')}


                            />
                        </Container>

                        <Spacer py={'2.5rem'} />

                        <Center>
                            <LinkBox textAlign="center">
                                <LinkOverlay href='https://github.com/thegrayeminence/material-manager/tree/main' isExternal>
                                    <MotionText
                                        sx={headerStyle}
                                        color={useColorModeValue(colorThemeValues.light.textHeader, colorThemeValues.dark.textHeader)}
                                    // initial="hidden" animate="visible" variants={textVariants}
                                    >
                                        More Info On GitHub:
                                    </MotionText>
                                </LinkOverlay>
                                <Spacer py={'.5rem'} />
                                <Icon
                                    as={FaGithub} height={'auto'}
                                    // _hover={{transform: 'scale(1.1)', color: useColorModeValue(colorThemeValues.light.hover, colorThemeValues.dark.hover)}}
                                    width={{base: '4rem', sm: '4rem', md: '5rem', lg: '6rem', xl: '6.5rem'}}
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



export default AboutSideBar;