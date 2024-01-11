import React from 'react'
import { Heading, Box, Flex } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/react'


const fontStylesHeader = {
        letterSpacing: '.07rem',
        textAlign: 'center',
        fontFamily: 'avenir',
        lineHeight: '1.35rem',
        color: 'blue.700',
        fontSize: '2.5rem',

    };

function Header({ text, customStyles = fontStylesHeader }) {

    return (
        <Heading sx={customStyles} _hover={{transform: 'scale(1.1)'}} >
            {text}
        </Heading>
    )
}

export default Header