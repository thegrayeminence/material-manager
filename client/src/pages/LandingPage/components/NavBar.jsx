import React from 'react';
import {
    Box, Flex, Tooltip, useDisclosure, Breadcrumb, BreadcrumbItem, BreadcrumbLink, useColorMode, useColorModeValue, Text
} from '@chakra-ui/react';

//icons:
import {IoMoonOutline} from '@react-icons/all-files/io5/IoMoonOutline'
import {IoSunnyOutline} from '@react-icons/all-files/io5/IoSunnyOutline'


//hooks and components
import {useNavigate, useLocation, useParams} from 'react-router-dom';
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
                color={useColorModeValue('gray.300', 'white')}
            >
                {children}
            </Flex>
        </>

    )

}

const BreadcrumbIconLink = ({size, icon, ...props}) => {
    return (
        <BreadcrumbLink {...props}>
            <Box as={icon} size={size}

            />

        </BreadcrumbLink>
    );
};

const BreadcrumbTextLink = ({size, text, ...props}) => {
    return (
        <BreadcrumbLink {...props}>
            <Box as={Text} size={size}> {text} </Box>

        </BreadcrumbLink>
    );
};

function NavBar({isOpen, onOpen, onClose, ...props}) {
    //hooks
    const navigate = useNavigate();
    const {name, id} = useParams();
    // const {isOpen, onOpen, onClose} = useDisclosure()
    const location = useLocation();
    const {colorMode, toggleColorMode} = useColorMode()


    // Function to determine the breadcrumb label based on the path

    const breadcrumbLabel = (path) => {
        switch (path) {
            case '/': return 'Home';
            case '/preview': return 'Forge';
            case `/loading/${id}`: return 'Loading...';
            case '/gallery': return 'Gallery';
            case `/gallery/${name}`: return `Material`;
            case `/gallery_id/${id}`: return `Material`;
            default: return 'Page';
        }
    };

    const icon_size = '1.35rem';
    const font_Size_dynamic = ['sm', 'md', 'lg', 'xl', '2xl']
    return (
        <>
            <NavBarContainer>

                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbIconLink size={icon_size} icon={colorMode === 'light' ? IoSunnyOutline : IoMoonOutline} href="#"
                            onClick={toggleColorMode}
                        />
                    </BreadcrumbItem>
                    {/* <BreadcrumbItem>
                        <BreadcrumbIconLink size={icon_size} href="/" onClick={(e) => {e.preventDefault(); navigate('/')}} icon={MdHome} />
                    </BreadcrumbItem> */}
                    {/* <BreadcrumbItem>
                        <BreadcrumbTextLink size={icon_size} text={'Home'} href="/" onClick={(e) => {e.preventDefault(); navigate('/')}} />
                    </BreadcrumbItem> */}
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink fontSize={font_Size_dynamic} href="#" onClick={(e) => e.preventDefault()}>
                            {breadcrumbLabel(location.pathname)}
                        </BreadcrumbLink>
                    </BreadcrumbItem>


                </Breadcrumb>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbTextLink fontSize={font_Size_dynamic} text={'Home'} href="/" onClick={(e) => {e.preventDefault(); navigate('/')}} />
                    </BreadcrumbItem>

                    {/* <BreadcrumbItem>
                        <BreadcrumbIconLink size={icon_size} icon={MdPhotoLibrary} href="#" onClick={(e) => {e.preventDefault(); navigate('/gallery')}} />
                    </BreadcrumbItem> */}
                    <BreadcrumbItem>
                        <BreadcrumbTextLink fontSize={font_Size_dynamic} text={'Gallery'} href="#" onClick={(e) => {e.preventDefault(); navigate('/gallery')}} />
                    </BreadcrumbItem>

                    {/* <BreadcrumbItem>
                        <BreadcrumbIconLink size={icon_size} icon={MdAddToPhotos} href="#" onClick={(e) => {e.preventDefault(); navigate('/preview')}} />
                    </BreadcrumbItem> */}
                    <BreadcrumbItem>
                        <BreadcrumbTextLink fontSize={font_Size_dynamic} text={'Forge'} href="#" onClick={(e) => {e.preventDefault(); navigate('/preview')}} />
                    </BreadcrumbItem>


                    {/* <BreadcrumbItem>
                        <BreadcrumbIconLink size={icon_size} icon={MdInfo} href="#" onClick={onOpen} />
                    </BreadcrumbItem> */}
                    <BreadcrumbItem>
                        <BreadcrumbTextLink fontSize={font_Size_dynamic} text={'About'} href="#" onClick={onOpen} />
                    </BreadcrumbItem>


                </Breadcrumb>


            </NavBarContainer>
            < AboutSideBar isOpen={isOpen} onClose={onClose} />

        </>
    );
}

export default NavBar;