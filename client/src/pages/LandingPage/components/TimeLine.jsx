import React from "react"
import {
    Box,
    chakra,
    Container,
    Link,
    Text,
    HStack,
    VStack,
    Flex,
    Icon,
    useColorModeValue
} from "@chakra-ui/react"
// Here we have used react-icons package for the icons
import {FaRegNewspaper} from "react-icons/fa"
import {BsGithub} from "react-icons/bs"

const timeLineData = [
    {
        id: 1,
        categories: ["Frontend", "User Input", "Request"],
        title: "User defines their material's properties via the form on TextureForge",
        icon: FaRegNewspaper,
        description: `User describes/classifies the properties of the material they want generated`,
        date: "Average Time Required: 30-60 seconds"
    },
    {
        id: 2,
        categories: ["Backend", "Database Storage"],
        title: "Prompts sent to backend and formatted/prepped for Stable Diffusion AI",
        icon: BsGithub,
        description: `TextureForge sends user descriptions to backend, stores them in the database, and then turns them into prompts optimally formatted for Stable Diffusion AI`,
        date: "Average Time Required: 10 seconds"
    },
    {
        id: 3,
        categories: ["Backend", "API Call"],
        title: "Prompts sent to SD to generate the first texture map (Albedo/BaseColor)",
        icon: BsGithub,
        description: `TextureForge sends prompts to Stable Diffusion to generate the first texture map (Albedo/BaseColor), using a text-to-image model`,
        date: "Average Time Required: 30-60 seconds"
    },
    {
        id: 4,
        categories: ["Backend", "Database Storage", "Response"],
        title: "Generated BaseColor texture map send to backend and stored in database",
        icon: BsGithub,
        description: `SD outputs Albedo/BaseColor texture map as a url; TextureForge stores url in database and sends it to frontend for user preview/download`,
        date: "Average Time Required: 15 seconds"
    },
    {
        id: 5,
        categories: ["Backend", "API Call"],
        title: "Prompts sent to SD to generate secondary PBR texture maps",
        icon: BsGithub,
        description: `TextureForge sends Albedo/BaseColor texture map to SD to generate the rest of the PBR texture maps (normal, roughness, height, etc.), using an image-to-image model`,
        date: "Average Time Required: 30 seconds to 2 minutes"
    },
    {
        id: 6,
        categories: ["Backend", "Database Storage", "Response"],
        title: "Generated PBR Maps stored in database and sent to frontend for user preview",
        icon: FaRegNewspaper,
        description: `SD outputs PBR texture maps as urls; TextureForge stores urls in database and sends them to frontend for user preview/download`,
        date: "Average Time Required: 15 seconds"
    },

    {
        id: 7,
        categories: ["Frontend"],
        title: "User previews and downloads their new texture maps!",
        icon: FaRegNewspaper,
        description: `Generated texture maps are loaded in browser for user preview; user downloads new assets, zipped into folder with optimal file structure/naming, and then uses them to their heart's content!`,
        date: "Average Time Required: N/A"
    }

]


const Timeline = () => {
    return (
        <Container maxWidth="4xl" p={{base: 2, sm: 10}}>
            <chakra.h3 fontSize="4xl" fontWeight="bold" mb={18} textAlign="center">
                How It Works
            </chakra.h3>
            {timeLineData.map((step, index) => (
                <Flex key={index} mb="10px">
                    <LineWithDot />
                    <Card {...step} />
                </Flex>
            ))}
        </Container>
    )
}

const Card = ({title, categories, description, icon, date}) => {
    return (
        <HStack
            p={{base: 3, sm: 6}}
            bg={useColorModeValue("gray.100", "gray.800")}
            spacing={5}
            rounded="lg"
            alignItems="center"
            pos="relative"
            _before={{
                content: `""`,
                w: "0",
                h: "0",
                borderColor: `transparent ${useColorModeValue(
                    "#edf2f6",
                    "#1a202c"
                )} transparent`,
                borderStyle: "solid",
                borderWidth: "15px 15px 15px 0",
                position: "absolute",
                left: "-15px",
                display: "block"
            }}
        >
            <Icon as={icon} w={12} h={12} color="teal.400" />
            <Box>
                <HStack spacing={2} mb={1}>
                    {categories.map(cat => (
                        <Text fontSize="sm" key={cat}>
                            {cat}
                        </Text>
                    ))}
                </HStack>
                <VStack spacing={2} mb={3} textAlign="left">
                    <chakra.h1
                        as={Link}
                        _hover={{color: "teal.400"}}
                        fontSize="2xl"
                        lineHeight={1.2}
                        fontWeight="bold"
                        w="100%"
                    >
                        {title}
                    </chakra.h1>
                    <Text fontSize="md" noOfLines={2}>
                        {description}
                    </Text>
                </VStack>
                <Text fontSize="sm">{date}</Text>
            </Box>
        </HStack>
    )
}

const LineWithDot = () => {
    return (
        <Flex pos="relative" alignItems="center" mr="40px">
            <chakra.span
                position="absolute"
                left="50%"
                height="calc(100% + 10px)"
                border="1px solid"
                borderColor={useColorModeValue("gray.200", "gray.700")}
                top="0px"
            ></chakra.span>
            <Box pos="relative" p="10px">
                <Box
                    pos="absolute"
                    width="100%"
                    height="100%"
                    bottom="0"
                    right="0"
                    top="0"
                    left="0"
                    backgroundSize="cover"
                    backgroundRepeat="no-repeat"
                    backgroundPosition="center center"
                    backgroundColor="rgb(255, 255, 255)"
                    borderRadius="100px"
                    border="3px solid rgb(4, 180, 180)"
                    backgroundImage="none"
                    opacity={1}
                ></Box>
            </Box>
        </Flex>
    )
}

export default Timeline
