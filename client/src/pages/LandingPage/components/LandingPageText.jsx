import React from 'react'
//libs
import {useNavigate} from 'react-router-dom';

import {motion} from 'framer-motion';
import {Stack, VStack, Box, Button, Text, Spacer} from '@chakra-ui/react';
import {GradientHeader, MotionContainer, StylishButton} from '../../../components';

//fonts
import '@fontsource/poppins';
import '@fontsource/inter';




// export const ManageMaterialsButton = (props, text) => {

//     return (
//         <GradientButton
//             onClick={() => navigate('/preview')}
//             size="lg"
//             bgGradient="linear(to-r, teal.500, green.500)"
//             color="white"
//             boxShadow="0px 1px 25px -5px rgb(66 153 225 / 50%), 0 10px 10px -5px rgb(66 153 225 / 40%)"
//             _hover={{bgGradient: "linear(to-r, teal.400, green.400)"}}
//             whileHover={{scale: 1.05}}
//             whileTap={{scale: 0.95}}
//             {...props}
//         >
//             {text}
//         </GradientButton>
//     );
// };




function LandingPageText() {

    const gradientHeaderStyle = {
        bgGradient: "linear(to-l, #7928CA, #FF0080)",
        bgClip: "text",
        letterSpacing: '.35rem',
        fontSize: '6rem',
        textAlign: 'center',
        textShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
        fontFamily: "inter, sans-serif",
        fontWeight: '900',
    };

    const detailHeaderStyle = {
        bgGradient: "linear(to-r, #9bf8f4, #6f7bf7)",
        bgClip: "text",
        letterSpacing: '.15rem',
        fontSize: '2.15rem',
        textAlign: 'center',
        textShadow: "2px 2px 2px rgba(0, 0, 0, 0.1)",
        fontFamily: "poppins, sans-serif",
        fontWeight: '600',

    };






    const navigate = useNavigate();


    return (
        <>




            <MotionContainer>
                <Stack direction='column'>
                    <VStack maxW='80vw'>
                        <GradientHeader text="TEXTURE FORGE" sx={gradientHeaderStyle} />
                        <GradientHeader text="GENERATE TEXTURE MAPS FOR PBR MATERIALS" sx={detailHeaderStyle} />
                    </VStack>
                    <Spacer py={'1rem'} />
                    <VStack>
                        <StylishButton handleClick={() => navigate('/preview')} text="Get Started" />
                        <StylishButton handleClick={() => navigate('/about')} text="Need Help?" />
                    </VStack>
                </Stack>
            </MotionContainer>

        </>
    )
}

export default LandingPageText

