import {Container, Box, chakra, Text, Icon, SimpleGrid, useColorModeValue} from '@chakra-ui/react';

import {motion, useScroll} from 'framer-motion';

import '@fontsource/poppins';
import '@fontsource/inter';

import {featuresText} from '../../../config/featuresInputData'

const colorThemeValues = {
    light: {
        bgMain: "white.800",
        bgDetail: "facebook.600",
        componentMain: "gray.100",
        componentDetail: "gray.200",
        borderMain: "blue.300",
        borderDetail: "twitter.300",
        icon: "twitter.400",
        textMain: "blue.700",
        textHeader: "blue.700",
        textDetail: "gray.700",
        highlight: "twitter.400",
        hover: "purple.400",
    },
    dark: {
        bgMain: "gray.800",
        bgDetail: "purple.600",
        componentMain: "gray.700",
        componentDetail: "gray.600",
        borderMain: "purple.800",
        borderDetail: "purple.600",
        icon: "purple.400",
        textMain: "gray.300",
        textHeader: "purple.600",
        textDetail: "gray.400",
        highlight: "purple.300",
        hover: "twitter.400",
    }
};

const Features = () => {


    const features = featuresText




    return (


        <Box zIndex={-1} maxW="6xl" p={{base: 5, md: 10}}
            // bg='transparent'
            // backgroundBlendMode={'overlay'}
            overflow="hidden"
            bgClip="text"
        >
            <chakra.h3 bgClip="text" fontSize="4xl" fontWeight="bold" mb={3} textAlign="center"
                color={useColorModeValue(colorThemeValues.light.textHeader, colorThemeValues.dark.textHeader)}
                fontFamily={'avenir black, avenir, sans-serif'}

            >
                Features
            </chakra.h3>
            <SimpleGrid
                columns={{base: 1, md: 2}}
                placeItems="center"
                spacing={16}
                mt={12}
                mb={4}
            >
                {features.map((feature, index) => (
                    <Box key={index} textAlign="center">
                        <Icon as={feature.icon} w={10} h={10}

                            color={useColorModeValue(colorThemeValues.light.icon, colorThemeValues.dark.icon)}
                        />
                        <chakra.h3 fontWeight="semibold" fontSize="2xl"
                            bgClip="text"
                            fontFamily={'avenir black, avenir, sans-serif'}
                            color={useColorModeValue(colorThemeValues.light.textMain, colorThemeValues.dark.textMain)}
                        >
                            {feature.heading}
                        </chakra.h3>
                        <Text
                            bgClip="text"
                            fontWeight={'500'}
                            fontFamily={'avenir next, avenir, sans-serif'}
                            color={useColorModeValue(colorThemeValues.light.textDetail, colorThemeValues.dark.textDetail)}
                        >{feature.content}</Text>
                    </Box>
                ))}
            </SimpleGrid>
        </Box>

    )
}

export default Features
