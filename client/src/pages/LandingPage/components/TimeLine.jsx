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
    Badge,
    useColorModeValue
} from "@chakra-ui/react"
// Here we have used react-icons package for the icons
import {FaRegNewspaper} from "react-icons/fa"
import {BsGithub} from "react-icons/bs"
import {PiNumberCircleOneThin, PiNumberCircleTwoThin, PiNumberCircleThreeThin, PiNumberCircleFourThin, PiNumberCircleFiveThin, PiNumberCircleSixThin, PiNumberCircleSevenThin, PiNumberCircleEightThin} from "react-icons/pi"


const timeLineData = [
    {
        id: 1,
        categories: ["Frontend", "User Input", "Request"],
        title: "User Defines Properties of Material to be Generated",
        icon: PiNumberCircleOneThin,
        description: `User describes/classifies the properties of the material they want generated via the site's form`,
        date: "Average Time Required: 30-60 seconds"
    },
    {
        id: 2,
        categories: ["Backend", "Database Storage"],
        title: "Descriptions Sent to Backend, Cached, and Re-Formatted as Prompts",
        icon: PiNumberCircleTwoThin,
        description: `TextureForge sends user descriptions to backend, stores them in the database, and then turns them into prompts optimally formatted for Stable Diffusion AI`,
        date: "Average Time Required: 10 seconds"
    },
    {
        id: 3,
        categories: ["Backend", "API Call"],
        title: "Text Prompt Sent to SD to Generate First Texture Map",
        icon: PiNumberCircleThreeThin,
        description: `TextureForge sends prompts to Stable Diffusion to generate the first texture map (Albedo/BaseColor), using a text-to-image model`,
        date: "Average Time Required: 30-60 seconds"
    },
    {
        id: 4,
        categories: ["Backend", "Database Storage", "Response"],
        title: "First Texture Map (BaseColor) Cached & Sent to Frontend for User Preview",
        icon: PiNumberCircleFourThin,
        description: `SD outputs Albedo/BaseColor texture map as a url; TextureForge stores url in database and sends it to frontend for user preview/download`,
        date: "Average Time Required: 15 seconds"
    },
    {
        id: 5,
        categories: ["Backend", "API Call"],
        title: "Image Prompt Sent to SD to Generate Rest of PBR Maps",
        icon: PiNumberCircleFiveThin,
        description: `TextureForge sends Albedo/BaseColor texture map to SD to generate the rest of the PBR texture maps (normal, roughness, height, etc.), using an image-to-image model`,
        date: "Average Time Required: 30 seconds to 2 minutes"
    },
    {
        id: 6,
        categories: ["Backend", "Database Storage", "Response"],
        title: "Generated PBR Maps Cached & Sent to Frontend for User Preview/Download",
        icon: PiNumberCircleSixThin,
        description: `SD outputs PBR texture maps as urls; TextureForge stores urls in database and sends them to frontend for user preview/download`,
        date: "Average Time Required: 15 seconds"
    },

    {
        id: 7,
        categories: ["Frontend"],
        title: "User previews and downloads their new texture maps!",
        icon: PiNumberCircleSevenThin,
        description: `Generated texture maps are loaded in browser for user preview; user downloads new assets, zipped into folder with optimal file structure/naming, and then uses them to their heart's content!`,
        date: "Average Time Required: N/A"
    }

]
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

const Timeline = () => {
    return (
        <Container maxWidth="4xl" p={{base: 2, sm: 10}}>
            <chakra.h3 fontSize="3xl" fontWeight="bold" mb={18} textAlign="center">
                How It Works:
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

    console.log(colorThemeValues.light.icon)
    return (
        <HStack

            p={{base: 3, sm: 6, md: 8, lg: 10}}
            bg={useColorModeValue(colorThemeValues.light.componentMain, colorThemeValues.dark.componentMain)}
            spacing={5}
            rounded="xl"
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
                borderWidth: "15px 30px 15px 0",
                borderLeftRadius: "10px",
                borderRightRadius: "0px",
                position: "absolute",
                left: "-30px",
                display: "block"
            }}
        >
            <Icon as={icon} w={12} h={12} color={useColorModeValue(colorThemeValues.light.icon, colorThemeValues.dark.icon)} />
            <Box>
                <HStack spacing={2} mb={1}>
                    {categories.map(cat => (
                        <Text fontSize={{base: "sm", sm: "sm", xl: "sm"}} key={cat} color={useColorModeValue(colorThemeValues.light.textDetail, colorThemeValues.dark.textDetail)}
                        >
                            {cat}
                        </Text>
                    ))}
                </HStack>
                <VStack spacing={2} mb={3} textAlign="left">
                    <chakra.h1
                        _hover={{color: useColorModeValue(colorThemeValues.light.hover, colorThemeValues.dark.hover)}}
                        color={useColorModeValue(colorThemeValues.light.textHeader, colorThemeValues.dark.textHeader)}
                        fontSize={{base: "xl", sm: "lg", md: "xl", xl: "2xl"}}
                        lineHeight={1.2}
                        fontWeight="800"
                        w="100%"
                    >
                        {title}
                    </chakra.h1>
                    <Text fontWeight="600" fontSize={{base: "lg", sm: "md", md: "lg", xl: "xl"}} noOfLines={2} color={useColorModeValue(colorThemeValues.light.textMain, colorThemeValues.dark.textMain)}
                    >
                        {description}
                    </Text>
                </VStack>
                <Text fontSize="sm" color={'gray.400'}>{date}</Text>
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
                borderColor={useColorModeValue(colorThemeValues.light.borderMain, colorThemeValues.dark.borderMain)}
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
                    backgroundColor={useColorModeValue(colorThemeValues.light.componentDetail, colorThemeValues.dark.componentDetail)}
                    borderRadius="100px"
                    border="3px solid"
                    borderColor={useColorModeValue(colorThemeValues.light.borderDetail, colorThemeValues.dark.borderDetail)}
                    backgroundImage="none"
                    opacity={1}
                ></Box>
            </Box>
        </Flex>
    )
}

export default Timeline
