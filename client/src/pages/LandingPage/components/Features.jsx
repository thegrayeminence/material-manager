import {Container, Box, chakra, Text, Icon, SimpleGrid} from '@chakra-ui/react';

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
        icon: "teal.300",
        textMain: "gray.600",
        textHeader: "blue.700",
        textDetail: "gray.400",
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
        textDetail: "gray.600",
        highlight: "purple.300",
        hover: "twitter.400",
    }
};

const Features = () => {


    const features = featuresText




    return (


        <Container maxW="6xl" p={{base: 5, md: 10}}>
            <chakra.h3 fontSize="4xl" fontWeight="bold" mb={3} textAlign="center">
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
                        <Icon as={feature.icon} w={10} h={10} color="blue.400" />
                        <chakra.h3 fontWeight="semibold" fontSize="2xl">
                            {feature.heading}
                        </chakra.h3>
                        <Text fontSize="md">{feature.content}</Text>
                    </Box>
                ))}
            </SimpleGrid>
        </Container>

    )
}

export default Features
