import React from 'react';
import {
    Box, Flex, useDisclosure, Breadcrumb, BreadcrumbItem, BreadcrumbLink, useColorMode
} from '@chakra-ui/react';

//icons:
import {FaCloudSun, FaCloudMoon, FaRegQuestionCircle, FaPhotoVideo} from "react-icons/fa";
import {AiOutlineHome} from "react-icons/ai";

//hooks and components
import {useNavigate, useLocation} from 'react-router-dom';
import AboutSideBar from './AboutSideBar';






const NavBarContainer = ({children}) => {

    return (
        <>
            <Flex
                as="nav"
                align="center"
                justify="space-between"
                wrap='nowrap'
                w="100%"
                bg='transparent'
                p={4}
                position="fixed"
                top={0}
                zIndex={1}
                color='whiteAlpha.800'
            >
                {children}
            </Flex>
        </>

    )

}

const BreadcrumbIconLink = ({size, icon, ...props}) => {
    return (
        <BreadcrumbLink {...props}>
            <Box as={icon} size={size} />
        </BreadcrumbLink>
    );
};

function NavBar() {
    //hooks
    const navigate = useNavigate();
    const {isOpen, onOpen, onClose} = useDisclosure()
    const location = useLocation();
    const {colorMode, toggleColorMode} = useColorMode()


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
                        <BreadcrumbIconLink size={'1.5rem'} href="/" onClick={(e) => {e.preventDefault(); navigate('/')}} icon={AiOutlineHome} />
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href="#" onClick={(e) => e.preventDefault()}>
                            {breadcrumbLabel(location.pathname)}
                        </BreadcrumbLink>
                    </BreadcrumbItem>


                </Breadcrumb>
                <Breadcrumb>

                    <BreadcrumbItem>
                        <BreadcrumbIconLink icon={FaPhotoVideo} href="#" onClick={(e) => {e.preventDefault(); navigate('/gallery')}} />
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbIconLink icon={FaRegQuestionCircle} href="#" onClick={onOpen} />
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbIconLink icon={colorMode === 'light' ? FaCloudSun : FaCloudMoon} href="#"
                            onClick={toggleColorMode}
                        />
                    </BreadcrumbItem>
                </Breadcrumb>


            </NavBarContainer>
            < AboutSideBar isOpen={isOpen} onClose={onClose} />

        </>
    );
}

export default NavBar;