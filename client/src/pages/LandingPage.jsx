import React from 'react'
//libs
import { Outlet, useNavigate, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Stack, VStack, Box, ButtonGroup, useColorModeValue } from '@chakra-ui/react';

//components
import { ChoiceButton } from '../components';
import { NavBar } from '../components'
import Header from '../components/Header';
//state

function LandingPage() {

    const navigate = useNavigate();

    //COMPONENT STYLING
    const btnStyles = {
        borderRadius: '6',
        borderWidth: '.125rem',
        borderColor: 'twitter.400',
        color: 'white',
        background: 'blue.400',
        boxShadow:'dark-lg',
    };
    const btnHover = {
        color: 'white', background: 'twitter.600',
        backdropFilter: 'auto', borderColor: 'twitter.200',
        backdropBlur: '20px', transform: 'scale(1.1)',
        transition: 'all 0.2s cubic-bezier(.08,.52,.52,1)'

    };
    //Text styles
    const headerStyle = {
        bgGradient: useColorModeValue('linear(to-r, blue.400, purple.600)', 'linear(to-r, purple.200, blue.600)'),
        bgClip: 'text',
        textAlign: 'center',
        letterSpacing: '.5rem',
        fontSize: '6xl',
        fontFamily: 'avenir',
        fontWeight: 'extrabold',
        backdropFilter: 'auto',
        transition: 'all 0.2s cubic-bezier(.08,.52,.52,1)',
    }


    return (
        <Box
            position="relative"
            overflow="hidden"
            minH='100vh'
            py={'5rem'}
            width='100vw'
            mt='-10'
        >
            {/* HEADER */}
            <Header text={'SERVICES:'} customStyles={headerStyle}/>

            {/* BUTTONS */}
            <VStack spacing={7} justify='center' 
            pt={'2rem'} ml='25%' width='50%'>
                
                    <ChoiceButton text={"PREVIEW TEXTURE FILES"}
                        handleClick={() => navigate('/preview')}
                        sx={btnStyles} hover={btnHover}
                    />
                    <ChoiceButton text={"RENAME TEXTURE FILES"}
                        handleClick={() => navigate('/rename')}
                        sx={btnStyles} hover={btnHover}
                    />
            </VStack>
        </Box>
    )
}

export default LandingPage