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


import {FaGithub} from "@react-icons/all-files/fa/FaGithub"


export const SimpleFooter = () => {
    return (

        <Box w='full' position={'absolute'} bottom={0} left={0} zIndex={0}>

            <footer>

                <Flex h='50px' direction={'row'} w="full" mx={'auto'} justify="center" align={'center'} >

                    <Heading fontSize={{base: 'lg', sm: 'md', md: 'xl', lg: '2xl', xl: '2xl'}}
                        fontFamily={'poppins, sans-serif'} fontWeight={'600'} color={useColorModeValue('gray.500', 'whiteAlpha.800')}
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