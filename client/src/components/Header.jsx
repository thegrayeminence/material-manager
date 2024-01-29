import React from 'react'
import {Heading, Box, Flex} from '@chakra-ui/react'
import {useColorModeValue} from '@chakra-ui/react'


const fontStylesHeader = {
    letterSpacing: '.07rem',
    textAlign: 'center',
    fontFamily: 'avenir',
    lineHeight: '1.35rem',
    color: 'whiteAlpha.400',
    fontSize: '2rem',

};

export default function Header({text, customStyles = fontStylesHeader}) {

    return (
        <Heading sx={customStyles} >
            {text}
        </Heading>
    )
}

