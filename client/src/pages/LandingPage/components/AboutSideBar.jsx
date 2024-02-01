import React from 'react';
import {FaGithub} from "react-icons/fa6";
import {
    Drawer, DrawerOverlay, DrawerContent, DrawerBody,
    DrawerHeader, DrawerCloseButton, Icon, Spacer, chakra, LinkBox, LinkOverlay
} from "@chakra-ui/react";
import {motion} from 'framer-motion';
import {Link} from "react-router-dom";

const MotionIcon = motion(Icon);
const MotionText = motion(chakra.Text);

const headerStyle = {
    fontWeight: 'semibold',
    color: 'slateblue',
    letterSpacing: '.2rem',
    fontFamily: 'Avenir Next, sans-serif',
    lineHeight: '1.35rem',
};

const bodyStyle = {
    fontWeight: 'medium',
    color: 'slategrey',
    letterSpacing: '.1rem',
    fontFamily: 'Avenir Next, sans-serif',
    lineHeight: '2rem',
    fontSize: '1.25rem'
};

const AboutSideBar = ({isOpen, onClose}) => {
    return (
        <Drawer closeOnEsc={true} closeOnOverlayClick={true}
            placement='right' isOpen={isOpen} onClose={onClose}
            isFullHeight={true} size='sm'
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader
                    sx={headerStyle}
                    pt='3rem' textAlign={'center'} fontSize='4xl'>
                    ABOUT/FAQ:
                </DrawerHeader>
                <DrawerBody fontSize={'2xl'}>
                    <MotionText sx={headerStyle} variants={textVariants} initial="hidden" animate="visible">
                        How It Works:
                    </MotionText>
                    <Spacer py={'1.5rem'} />
                    <MotionText sx={bodyStyle} variants={textVariants} initial="hidden" animate="visible">
                        1. User describes/classifies the properties of the material they want generated
                    </MotionText>
                    <Spacer py={'.5rem'} />
                    <MotionText sx={bodyStyle} variants={textVariants} initial="hidden" animate="visible">
                        2. TextureForge takes the descriptions and turns them into prompts optimally formatted for Stable Diffusion AI
                    </MotionText>
                    <Spacer py={'.5rem'} />
                    <MotionText sx={bodyStyle} variants={textVariants} initial="hidden" animate="visible">
                        3. Prompts are sent to API and used to generate the texture maps via two steps (text to image for Albedo map, image to image for other maps)
                    </MotionText>
                    <Spacer py={'.5rem'} />
                    <MotionText sx={bodyStyle} variants={textVariants} initial="hidden" animate="visible">
                        4. Once textures have been generated and loaded in browser, download and use the texture maps to your heart's content!
                    </MotionText>
                    <Spacer py={'2.5rem'} />
                    <Spacer py={'1rem'} />
                    <MotionText sx={headerStyle} variants={textVariants} initial="hidden" animate="visible">
                        What is 'PBR'?:
                    </MotionText>
                    <MotionText sx={bodyStyle} variants={textVariants} initial="hidden" animate="visible">
                        Physically Based Rendering (PBR) engines utilize real-world equations to simulate the way that light interacts with surfaces.
                        Texture maps are a big component in these systems — with each bitmap, typically between 4-7, representing a different channel
                        of information to describe optical phenomena like diffusion (albedo/base_color), surface-geomtetry
                        describe the way that light int
                    </MotionText>
                    <Spacer py={'.5rem'} />
                    <LinkBox mt="4" textAlign="center">
                        <LinkOverlay href='https://github.com/thegrayeminence/material-manager/tree/work1' isExternal>
                            <MotionText sx={headerStyle} variants={textVariants} initial="hidden" animate="visible">
                                GitHub Repo:
                            </MotionText>
                        </LinkOverlay>
                        <MotionIcon
                            as={FaGithub} w='15%' height={'auto'}
                            _hover={{transform: 'scale(1.1)'}}
                            variants={iconVariants}
                            initial="hidden"
                            animate="visible"
                        />
                    </LinkBox>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
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