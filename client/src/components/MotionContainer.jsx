import React from 'react'
import {motion} from 'framer-motion';
import {Box} from '@chakra-ui/react';

const MotionBox = motion(Box);

export default function MotionContainer({
    children,
    initial = 'initial',
    animate = 'animate',
    ...props
}) {

    return (
        <MotionBox
            position="relative"
            overflow="hidden"
            minH="100vh"
            width="100vw"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            initial={initial}
            animate={animate}
            {...props}
        >
            {children}
        </MotionBox>


    );
}