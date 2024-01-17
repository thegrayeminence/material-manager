import React from 'react';
import {
    Box, Flex, useColorModeValue, Stack, useColorMode, useDisclosure, Breadcrumb, BreadcrumbItem, BreadcrumbLink
} from '@chakra-ui/react';

//icons:
import {ViewIcon, QuestionIcon} from "@chakra-ui/icons";
// import { IoMdPhotos } from "react-icons/io";
import {AiOutlineHome} from "react-icons/ai";

//hooks and components
import {useNavigate, useLocation} from 'react-router-dom';
import ColorModeToggle from './ColorModeToggle';
import AboutSideBar from './AboutSideBar';
import SideBarBtn from './UI/SideBarBtn';


const NavBarContainer = ({children}) => {
    return (
        <>
            <Flex
                as="nav"
                align="center"
                justify="space-between"
                wrap='nowrap'
                w="100%"
                bg={'transparent'}
                p={4}
                //boxShadow="sm"
                position="fixed"
                top={0}
                zIndex={1}
                color={'whiteAlpha.800'}
            >
                {children}
            </Flex>
        </>

    )

}

function NavBar() {
    //hooks
    const navigate = useNavigate();
    const {isOpen, onOpen, onClose} = useDisclosure()
    const location = useLocation();
    const {colorMode} = useColorMode();



    // Function to determine the breadcrumb label based on the path
    const breadcrumbLabel = (path) => {
        switch (path) {
            case '/': return 'Home';
            case '/preview': return 'Preview';
            case '/loading-textures': return 'Loading Textures';
            case '/gallery': return 'Gallery';
            default: return 'Page';
        }
    };

    return (
        <>
            <NavBarContainer>

                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/" onClick={(e) => {e.preventDefault(); navigate('/')}}>
                            <AiOutlineHome />
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href="#" onClick={(e) => e.preventDefault()}>
                            {breadcrumbLabel(location.pathname)}
                        </BreadcrumbLink>
                    </BreadcrumbItem>


                </Breadcrumb>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="#" onClick={(e) => {e.preventDefault(); navigate('/gallery')}}>
                            <ViewIcon />
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="#" onClick={onOpen}>
                            <QuestionIcon />
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                </Breadcrumb>


            </NavBarContainer>
            < AboutSideBar isOpen={isOpen} onClose={onClose} />

        </>
    );
}

export default NavBar;