import React from 'react';
import {motion} from 'framer-motion';
import {Button} from '@chakra-ui/react';

const GradientButton = motion(Button);

export default function StylishButton({handleClick, text, ...props}) {

    const buttonMotion = {
        animate: {
            scale: [1, 1.05, 1],
            transition: {
                duration: 3,
                ease: "easeInOut",
                loop: Infinity,
            }
        }
    };



    return (
        <GradientButton
            onClick={handleClick}
            size='lg'
            bgGradient={['linear(to-r, teal.500, green.500)', 'linear(to-l, #7928CA, #FF0080)']}
            color="white"
            _hover={{bgGradient: "linear(to-r, teal.400, green.400)"}}
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.95}}
            variants={buttonMotion}
            initial="initial"
            animate="animate"
            {...props}
        >
            {text}
        </GradientButton>
    );
};
