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

                    <Text sx={headerStyle}>Description:</Text>
                    <Spacer py={'1rem'} />
                    <Text sx={bodyStyle}>Postcard Genie is a web platform intended to enable the creation of custom postcards via generative AI/conventional styling options driven by data gathered from user inputs and prompts. Site uses Chakra UI as the main UI/component library.</Text>
                    <Spacer py={'2.5rem'} />
                    <Link to='https://github.com/thegrayeminence/Postcard-Generator'>
                        <Text sx={headerStyle}>View repo on GitHub:</Text>
                    </Link>
                    <Spacer py={'.5rem'} />
                    <Link to='https://github.com/thegrayeminence/Postcard-Generator'>
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