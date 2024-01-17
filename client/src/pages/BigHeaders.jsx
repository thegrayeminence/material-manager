
import React, {useEffect} from 'react';
//libs
import {useNavigate, Navigate} from 'react-router-dom';

import {AnimatePresence, motion} from 'framer-motion';
import {Stack, VStack, Box, Button, Heading, Text, ButtonGroup, useColorModeValue} from '@chakra-ui/react';

export const HeaderI() = (<Heading
    // Card Editor Form Header
    bgGradient={useColorModeValue('linear(to-r, pink.400, purple.600)', 'linear(to-r, purple.200, blue.600)')}
    bgClip='text'
    textAlign={'center'}
    letterSpacing={'.5rem'}
    fontSize='6xl'
    fontFamily={'avenir'}
    fontWeight='extrabold'
    backdropFilter='auto'
    filter='drop-shadow(0.035em 0.050em .1rem #00f)'
    transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
    _hover={{
        transform: 'scale(1.08)',

    }}


>{text}</Heading>)

export const HeaderII = (< Heading
    bgGradient={useColorModeValue('linear(to-r, pink.400, purple.600)', 'linear(to-r, purple.200, blue.600)')}
    bgClip='text'
    fontSize='5xl'
    fontWeight='bold'
    letterSpacing='.1rem'
    fontFamily='Avenir Next'


>
    {text}
</Heading >)


export const HeaderIII = (<Heading
    bgGradient={useColorModeValue(

        'linear(to-bl, pink.100, teal.100)',
        'linear(to-tr, purple.600, blue.800)')}
    bgClip='text'
    fontSize='2.7rem'
    fontWeight='bold'
    letterSpacing='.25rem'
    textAlign='center'
    fontFamily='Avenir Next'
    transition='all 0.2s cubic-bezier(.08,.52,.52,1)'

    _hover={{
        transform: 'scale(1.07)'
    }}
>
    {text}
</Heading>
);

function BigHeaders() {





    return (
        <>
            {HeaderI}
            {HeaderII}
            {HeaderIII}

        </>
    )
};

export default BigHeaders





