import React from 'react';
import {
    Box, Flex, useColorModeValue, Stack, useColorMode, Breadcrumb, BreadcrumbItem, BreadcrumbLink
} from '@chakra-ui/react';
import {AiOutlineHome} from "react-icons/ai";
import {useNavigate, useLocation} from 'react-router-dom';
import ColorModeToggle from './ColorModeToggle';

function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const {colorMode} = useColorMode();
    // Function to determine the breadcrumb label based on the path
    const breadcrumbLabel = (path) => {
        switch (path) {
            case '/': return 'Home';
            case '/preview': return 'Preview';
            case '/about': return 'About';
            case '/loading-textures': return 'Loading Textures';
            case '/gallery': return 'Gallery';
            default: return 'Page';
        }
    };

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap='nowrap'
            w="100%"
            bg={colorMode === 'light' ? 'transparent' : 'gray.900'}
            p={4}
            boxShadow="sm"
            position="fixed"
            top={0}
            zIndex={1}
        >
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
            <ColorModeToggle />
        </Flex>
    );
}

export default NavBar;