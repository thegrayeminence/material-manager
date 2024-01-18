import {FaGithub} from "react-icons/fa6";
import {
    Drawer, DrawerOverlay, DrawerContent, DrawerBody,
    DrawerHeader, DrawerCloseButton, Icon, Spacer, Text
} from "@chakra-ui/react";
import {Link} from "react-router-dom";



const AboutSideBar = ({isOpen, onClose}) => {

    const headerStyle = {

        fontWeight: 'semibold',
        color: 'slateblue',
        letterSpacing: '.2rem',
        fontFamily: 'Avenir Next',
        lineHeight: '1.35rem',

    };

    const bodyStyle = {

        fontWeight: 'medium',
        color: 'slategrey',
        letterSpacing: '.1rem',
        fontFamily: 'Avenir Next',
        lineHeight: '2rem',
        fontSize: '1.25rem'
    };


    return (
        <Drawer closeOnEsc={true} closeOnOverlayClick={true}
            placement='right' isOpen={isOpen} onClose={onClose}
            isFullHeight={true} size='sm'
        >

            <DrawerOverlay />
            <DrawerContent

            >
                <DrawerCloseButton />
                <DrawerHeader

                    sx={headerStyle}
                    pt='3rem' textAlign={'center'} fontSize='4xl'>
                    ABOUT:
                </DrawerHeader>
                <DrawerBody fontSize={'2xl'}>
                    <Spacer py={'1rem'} />

                    <Text sx={headerStyle}>How It Works:</Text>
                    <Spacer py={'1.5rem'} />
                    <Text sx={bodyStyle}>1. User describes/classifies the properties of the material they want generated
                    </Text>
                    <Spacer py={'.5rem'} />
                    <Text sx={bodyStyle}>2. ShaderProxy takes the descriptions and turns them into prompts optimally formatted for Stable Diffusion AI
                    </Text>
                    <Spacer py={'.5rem'} />
                    <Text sx={bodyStyle}>3. Prompts are sent to API and used to generate the texture maps via two steps (text to image for Albedo map, image to image for other maps)
                    </Text>
                    <Spacer py={'.5rem'} />
                    <Text sx={bodyStyle}>4. Once textures have been generated and loaded in browser, download and use the texture maps to your heart's content!
                    </Text>
                    <Spacer py={'2.5rem'} />
                    <Link to='https://github.com/thegrayeminence/material-manager/tree/work1'>
                        <Text sx={headerStyle}>View repo on GitHub:</Text>
                    </Link>
                    <Spacer py={'.5rem'} />
                    <Link to='https://github.com/thegrayeminence/material-manager/tree/work1'>
                        <Icon
                            as={FaGithub} w='15%' height={'auto'}
                            _hover={{transform: 'scale(1.1)'}}
                        />
                    </Link>
                </DrawerBody>
            </DrawerContent>
        </Drawer>


    )
}

export default AboutSideBar