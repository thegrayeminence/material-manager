import React from 'react';
import {FaGithub} from "react-icons/fa6";
import {
    Drawer, DrawerOverlay, DrawerContent, DrawerBody,
    DrawerHeader, DrawerCloseButton, Icon, Spacer, chakra, LinkBox, LinkOverlay
} from "@chakra-ui/react";
import {motion} from 'framer-motion';
import {Link} from "react-router-dom";
import Timeline from './TimeLine';

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
            isFullHeight={true} size={['sm', 'md', 'lg', 'xl']}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader
                    sx={headerStyle}
                    pt='3rem' textAlign={'center'} fontSize='4xl'>
                    ABOUT & FAQ:
                </DrawerHeader>
                <DrawerBody fontSize={'2xl'}>
                    <Timeline />
                    <Spacer py={'1rem'} />

                    <MotionText fontSize='4xl' textAlign={'center'} sx={headerStyle} variants={textVariants} initial="hidden" animate="visible">
                        What is 'PBR'?: <br />
                    </MotionText>
                    <MotionText sx={bodyStyle} variants={textVariants} initial="hidden" animate="visible">
                        <strong>P</strong>hysically <strong>B</strong>ased <strong>R</strong>endering is a method
                        in which real-world equations and bitmaps are employed to realistically
                        compute/simulate the way that light interacts with surfaces and environments. <br /> <br />
                        In PBR systems/engines, a set of specifically-formatted/complementary bitmaps (typically b/t 4-7) are connected to a parent material
                        , with each image representing a different channel of information (—each analagous to a specific category of optimical phenomena
                        that might be relevant to accurately describe their material's properties—)
                        — e.g. diffuse light (albedo and baseColor maps),
                        reflectivity (roughness and spec maps), environmental shadows (ao maps), and surface-geometry details (normal and height maps).
                        <br /> <br />
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