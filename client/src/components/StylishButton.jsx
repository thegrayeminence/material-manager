import React from 'react';
import {motion} from 'framer-motion';
import {Button, useColorModeValue} from '@chakra-ui/react';
import '@fontsource/poppins';
import '@fontsource/inter';
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
            fontFamily={'poppins black, sans-serif'}
            fontWeight={'bold'}
            // size='lg'
            fontSize={{base: 'sm', sm: 'md', md: 'lg', lg: 'lg', xl: 'xl'}}
            overflow={'clip'}
            paddingY={['1rem', '2rem', '2rem', '2.5rem']}
            paddingX={['1rem', '1rem', '1.5rem', '2rem']} whiteSpace={'preserve-spaces'}
            bgGradient={useColorModeValue("linear(to-r, teal.400, green.400)", ['linear(to-r, teal.500, green.500)', 'linear(to-l, #7928CA, #FF0080)'])}
            color="white"
            borderRadius={'md'}
            _hover={{bgGradient: useColorModeValue(['linear(to-r, teal.500, green.500)', 'linear(to-l, #7928CA, #FF0080)'], "linear(to-r, teal.400, green.400)")}}
            whileHover={{scale: 1.15}}
            whileTap={{scale: 0.925}}
            variants={buttonMotion}
            initial="initial"
            animate="animate"
            {...props}
        >
            {text}
        </GradientButton>
    );
};
