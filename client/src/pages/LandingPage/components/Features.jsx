import {Container, Box, chakra, Text, Icon, SimpleGrid} from '@chakra-ui/react';

import {motion, useScroll} from 'framer-motion';


import {featuresText} from '../../../config/featuresInputData'


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
