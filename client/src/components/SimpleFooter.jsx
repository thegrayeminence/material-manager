import React from 'react'
import '@fontsource/poppins';
import '@fontsource/inter';

import {
    Flex,
    Heading,
    HStack,
    IconButton,
    Spacer,
    Text,
    Link,
    useColorModeValue,
    Box,
} from '@chakra-ui/react'

import {FaGithub} from "react-icons/fa";


export const SimpleFooter = () => {
    return (
        <Box w='full'>

            <footer>
                <Flex direction={'row'} w="full" mx={'auto'} justify="center" bg='transparent' align={'center'} >
                    <Heading fontSize={{base: 'lg', sm: 'md', md: 'xl', lg: '2xl', xl: '3xl'}}
                        fontFamily={'poppins, sans-serif'} fontWeight={'600'} color='whiteAlpha.600'
                        px='25px'
                    >
                        TextureForge
                    </Heading>

                    <HStack spacing={1}>
                        <Link href='https://github.com/thegrayeminence/material-manager' isExternal>
                            <IconButton isRound={true} aria-label="Github" color='white' bg={useColorModeValue('facebook.600', 'purple.600')} opacity={'.75'} icon={<FaGithub />}>

                            </IconButton>
                        </Link>
                    </HStack>
                </Flex>
            </footer>
        </Box  >
    )
}
export default SimpleFooter