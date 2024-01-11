import React from 'react'
import { Box, Flex, Button, useColorModeValue, Stack,  useColorMode, useDisclosure } from '@chakra-ui/react';
import ColorModeToggle from './ColorModeToggle'
import { AiOutlineHome } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

import NavBarButton from './NavButton';


const NavBarContainer = ({ children }) => {
    return (

        <Box
            bgGradient={useColorModeValue(
                'linear(to-tr, blue.700, teal.100)',
                'linear(to-bl, blue.700, purple.200)',)}>

            <Flex
                as="nav"
                align="center"
                justify="space-between"
                wrap='nowrap'
                minW="100%"
                maxH='20vh'
                mb={10}
                p={10}
            >
                {children}
            </Flex>
        </Box>
    );
};

function NavBar() {

    const navigate = useNavigate()

    return (
        <>
            <NavBarContainer >

                <Stack direction={'row'} spacing={6}>

                    <ColorModeToggle />
                    <NavBarButton children={< AiOutlineHome />} func={()=>navigate('/')} />

                </Stack>
            </NavBarContainer>
        </>
    )
}

export default NavBar