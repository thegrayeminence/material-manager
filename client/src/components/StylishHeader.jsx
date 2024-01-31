

import React from 'react';
import {motion} from 'framer-motion';
import {Heading} from '@chakra-ui/react';

const MotionHeading = motion(Heading);

export default function StylishHeader({text, textMotion, ...props}) {

    const textMotionDefault = {
        animate: {
            y: [0, -5, 0],
            scale: [1, 1.025, 1],
            transition: {
                duration: 6,
                ease: "easeInOut",
                loop: Infinity,
            }
        }
    };

    return (
        <MotionHeading
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontSize="6xl"
            fontWeight="extrabold"
            textAlign="center"
            letterSpacing="wide"
            //textShadow="2px 2px 2px rgba(0, 0, 0, 0.3)"
            //variants={textMotion = null}
            initial="initial"
            animate="animate"
            {...props} // Spread additional props here
        >
            {text}
        </MotionHeading>
    );
}
