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
            h='100%'
            width="100%"
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