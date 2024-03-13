import React from 'react';
import {FaGithub} from "@react-icons/all-files/fa/FaGithub";
import {
    Drawer, Box, HStack, VStack, DrawerOverlay, DrawerContent, DrawerBody,
    DrawerHeader, Container, DrawerCloseButton, Center, useColorModeValue, Icon, Divider, Spacer, chakra, LinkBox, LinkOverlay, Text, Heading
} from "@chakra-ui/react";
import '@fontsource/poppins';
import '@fontsource/inter';
import {Link} from "react-router-dom";
import Timeline from './TimeLine';


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
    lineHeight: '2.5rem',
    fontSize: ['lg', 'lg', 'xl', '2xl'],
    fontFamily: 'inter, sans-serif',

};

const detailStyle = {
    fontWeight: '200',
    lineHeight: '1.5rem',
    fontSize: ['sm', 'md', 'lg', 'xl'],
    fontFamily: 'avenir next, sans-serif',
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
                    <Spacer py={'1.5rem'} />
                    <Divider
                        textAlign={'center'} borderWidth={'.2rem'} w={'90%'}
                        mx='auto'
                        borderStyle={'solid'}
                        borderColor={useColorModeValue('teal.400', 'facebook.600')}
                    />
                    <Box
                        padding={{base: '8', sm: '6', md: '12', lg: '16', xl: '20'}}
                    >
                        <Center>

                            <Heading color={useColorModeValue(colorThemeValues.light.textHeader, colorThemeValues.dark.textHeader)} sx={headerStyle} textAlign={'center'} >
                                Site Overview:
                            </Heading>

                        </Center>

                        <Spacer py={'1.5rem'} />


                        <Container sx={bodyStyle} color={useColorModeValue(colorThemeValues.light.textMain, colorThemeValues.dark.textMain)}>

                            <Text>
                                <strong>What is TextureForge:</strong>
                                <br />

                                TextureForge is a web-app designed to simplify the process of creating textures for game development, 3D renders,
                                and VFX projects, streamlining typical workflows for managing PBR<sup>1</sup> {'\u00A0'}
                                materials by offering a straightforward, free way to generate them directly within the browser.
                                <br />
                                <br />
                                The site employs a practical, intuitive interface that leverages Stable Diffusion (an open-source generative AI model) to create the images,
                                ensuring that users can quickly get the materials they need with a minimum level of input and without having to compromise on quality or spend time
                                (and money) using proprietary software.
                                <br />
                                <br />
                                <strong>How Do I Use It:</strong>
                                <br />
                                To use the service, a user can simply input a description matching the material they want (via the site's 'Forge' page), click submit, and wait
                                for their prompt to be processed.Meanwhile, under the hood TextureForge will take the user's description, translate it into a prompt optimally
                                formatted for Stable Diffusion, and send it to SD for evaluation<sup>2</sup>.
                                After the textures load, they can then be previewed directly in the browser, downloaded using filenames structured for easy management, and imported into the user's 3D program of choice.
                                <br />
                                <br />
                                <strong>Why Make This:</strong>
                                <br />
                                As a platform, TextureForge was designed in the name of efficiency, accessibility, and elasticity; the overall goal was to provide digital artists and game developers
                                with a user-friendly, time-saving tool for generating and managing their materials (—especially handy in projects where it makes sense to prioritize speed,
                                resource management, and lower-fidelity renders over photorealistic lighting, like previzualizations and alpha-testing.)
                                <br />
                                <br />
                            </Text>

                            <Text sx={detailStyle} color={useColorModeValue(colorThemeValues.light.textMain, colorThemeValues.dark.textMain)} px={'1rem'}>
                                <span>1: <i>Physically Based Realism refers to a computer graphics technique/set of rules that has become the industry-standard for
                                    creating photorealistic 3D renders and game engines. See below section for more info.</i></span> <br /> <br />
                                <span>2: <i>To be specific, SD's processing of the initial prompt takes place in two stages: first via a text-to-image model (for the base color of the material);
                                    and next via an image-to-image model (for everything else).</i></span>

                            </Text>
                        </Container>
                    </Box>


                    <Spacer py={'1rem'} />

                    <Divider
                        textAlign={'center'} borderWidth={'.2rem'} w={'90%'}
                        mx='auto'
                        borderStyle={'solid'}
                        borderColor={useColorModeValue('teal.400', 'facebook.600')}
                    />
                    <Spacer py={'1rem'} />

                    <Timeline />

                    <Spacer py={'1rem'} />
                    <Box padding={{base: '8', sm: '6', md: '12', lg: '16', xl: '20'}}>
                        <Center>
                            <Heading color={useColorModeValue(colorThemeValues.light.textHeader, colorThemeValues.dark.textHeader)} sx={headerStyle} textAlign={'center'} >
                                What is 'PBR'?: <br />
                            </Heading>
                        </Center>

                        <Spacer py={'1.5rem'} />
                        <Container >
                            <Text sx={bodyStyle} color={useColorModeValue(colorThemeValues.light.textMain, colorThemeValues.dark.textMain)} >
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
                                For more in-depth documentation on PBR systems, see:
                            </Text>

                            <Text sx={bodyStyle} color={useColorModeValue(colorThemeValues.light.textMain, colorThemeValues.dark.textMain)} textAlign={'center'}>
                                <a href="https://reference.wolfram.com/language/tutorial/PhysicallyBasedRendering.html">Wolfram Guide</a>
                                <br />
                                <a href="https://creativecloud.adobe.com/learn/substance-3d-designer/web/the-pbr-guide-part-1">Adobe Guide</a>
                                <br />
                            </Text>

                            <Spacer py={'1.5rem'} />

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
                                    <Heading sx={headerStyle} color={useColorModeValue(colorThemeValues.light.textHeader, colorThemeValues.dark.textHeader)} >
                                        More Info On GitHub:
                                    </Heading>
                                </LinkOverlay>
                                <Spacer py={'.5rem'} />
                                <Icon as={FaGithub} height={'auto'} width={{base: '4rem', sm: '4rem', md: '5rem', lg: '6rem', xl: '6.5rem'}} color={useColorModeValue(colorThemeValues.light.icon, colorThemeValues.dark.icon)} />
                            </LinkBox>
                        </Center>
                    </Box>
                </DrawerBody>
            </DrawerContent>
        </Drawer >
    );
};



export default AboutSideBar;