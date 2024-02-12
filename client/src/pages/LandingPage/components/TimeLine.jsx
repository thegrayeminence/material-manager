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
    useColorModeValue,
    Spacer,

} from "@chakra-ui/react"
// Here we have used react-icons package for the icons
import {FaRegNewspaper, FaWpforms, FaDatabase} from "react-icons/fa"
import {BsGithub, BsDatabaseDown, BsDatabaseCheck, BsDatabaseUp} from "react-icons/bs"
import {PiBrain, PiNumberCircleOneFill, PiNumberCircleTwoFill, PiNumberCircleThreeFill, PiNumberCircleFourFill, PiNumberCircleFiveFill, PiNumberCircleSixFill, PiNumberCircleSevenFill, PiNumberCircleEightThin} from "react-icons/pi"
import {IoCloudDownloadOutline} from "react-icons/io5";
import {AiOutlineSend} from "react-icons/ai";
import {BiBrain} from "react-icons/bi";
import {LuBrainCog} from "react-icons/lu";


const utfNumbersCircledRaw = ['\u24EA', '\u2461', '\u2462', '\u2463', '\u2464', '\u2465', '\u2466', '\u2467', '\u2468', '\u2469']
const utfNumbersCircled = [
    `⓵`, `⓶`, `⓷`, `⓸`, `⓹`, `⓺`, `⓻`, `⓼`, `⓽`, `⓾`
]
const timeLineData = [
    {
        id: 1,
        categories: ["Frontend", "User Input", "Request"],
        title: "User Defines Properties of Material to be Generated",
        icon: PiNumberCircleOneFill,
        bigIcon: FaWpforms,
        description: `User describes/classifies the properties of the material they want generated via the inputs on the site's form`,
        date: "Average Time Required: 30-60 seconds"
    },
    {
        id: 2,
        categories: ["Backend", "Database Storage"],
        title: "Descriptions Sent to Backend, Cached, and Re-Formatted as Prompts",
        icon: PiNumberCircleTwoFill,
        bigIcon: AiOutlineSend,
        description: `TextureForge sends user descriptions to backend, stores them in the database, and then turns them into prompts optimally formatted for Stable Diffusion AI`,
        date: "Average Time Required: 10 seconds"
    },
    {
        id: 3,
        categories: ["Backend", "API Call"],
        title: "Text Prompt Sent to SD to Generate First Texture Map",
        icon: PiNumberCircleThreeFill,
        bigIcon: LuBrainCog,
        description: `TextureForge sends prompts to Stable Diffusion to generate the first texture map (Albedo/BaseColor), using a text-to-image model`,
        date: "Average Time Required: 30-60 seconds"
    },
    {
        id: 4,
        categories: ["Backend", "Database Storage", "Response"],
        title: "First Texture Map (BaseColor) Cached & Sent to Frontend",
        icon: PiNumberCircleFourFill,
        bigIcon: BsDatabaseCheck,
        description: `SD outputs Albedo/BaseColor texture map as a url; TextureForge stores url in database and sends it to frontend for user preview/download`,
        date: "Average Time Required: 15 seconds"
    },
    {
        id: 5,
        categories: ["Backend", "API Call"],
        title: "Image Prompt Sent to SD to Generate Rest of PBR Maps",
        icon: PiNumberCircleFiveFill,
        bigIcon: LuBrainCog,
        description: `TextureForge sends Albedo/BaseColor texture map to SD to generate the rest of the PBR texture maps (normal, roughness, height, etc.), using an image-to-image model`,
        date: "Average Time Required: 30 seconds to 2 minutes"
    },
    {
        id: 6,
        categories: ["Backend", "Database Storage", "Response"],
        title: "Generated PBR Maps Cached & Sent to Frontend",
        icon: PiNumberCircleSixFill,
        bigIcon: BsDatabaseCheck,
        description: `SD outputs PBR texture maps as urls; TextureForge stores urls in database and sends them to frontend for user preview/download`,
        date: "Average Time Required: 15 seconds"
    },

    {
        id: 7,
        categories: ["Frontend", "User Input"],
        title: "User Downloads New Assets and Uses Them to Their Heart's Content!",
        icon: PiNumberCircleSevenFill,
        bigIcon: IoCloudDownloadOutline,
        description: `Generated texture maps are loaded in browser for user to preview; user downloads new assets, zipped into folder with optimal file structure/naming, and then imports them/uses them however they want!`,
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
            <chakra.h3
                color={useColorModeValue(colorThemeValues.light.textMain, colorThemeValues.dark.textMain)}
                fontWeight="bold" mb={18} textAlign="center" fontSize={{base: '3xl', sm: '2xl', lg: '4xl'}}>
                How It Works:
            </chakra.h3>
            {timeLineData.map((step, index) => (
                <Flex key={index}  >
                    <LineWithDot  {...step} />
                    <Box >
                        <Card  {...step} />
                        <Spacer h={2} />
                    </Box>
                </Flex>
            ))}
        </Container>
    )
}

const Card = ({title, categories, description, icon, bigIcon, date}) => {

    return (
        <HStack


            p={{base: 3, sm: 6, md: 8, lg: 10}}
            spacing={5}
            rounded="xl"
            alignItems="center"
            pos="relative"
            bg={useColorModeValue('blackAlpha.200', colorThemeValues.dark.componentMain)}
            boxShadow={'xl'}
            _hover={{transform: 'scale(1.05)'}}
            transition={'transform 0.3s'}
        >
            <Icon as={bigIcon} w={12} h={12}
                color={useColorModeValue(colorThemeValues.light.icon, colorThemeValues.dark.icon)} />
            <Box  >
                <HStack spacing={1} mb={1}>
                    {categories.map(cat => (
                        <Text fontSize={{base: "sm", sm: "sm", xl: "sm"}} key={cat} noOfLines={1} color={useColorModeValue(colorThemeValues.light.textDetail, colorThemeValues.dark.textDetail)}
                        >
                            {`| ${cat} `}
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
                    <Text fontWeight="600" fontSize={{base: "lg", sm: "md", md: "lg", xl: "xl"}}
                        noOfLines={4} color={useColorModeValue(colorThemeValues.light.textMain, colorThemeValues.dark.textMain)}
                    >
                        {description}
                    </Text>
                </VStack>
                <Text fontSize="sm" color={'gray.400'}>{date}</Text>
            </Box>
        </HStack>
    )
}

const LineWithDot = ({icon}) => {



    return (
        <Flex pos="relative" alignItems="center"  >
            <chakra.span
                position="relative"

                height="calc((100%) - 20%)"
                border="1px solid"
                borderColor={useColorModeValue(colorThemeValues.light.borderDetail, colorThemeValues.dark.borderMain)}
                top="0px"
                zIndex={-1}
                opacity={.5}
            // bgClip={'text'}
            ></chakra.span>
            <Box pos="relative" p="10px" >
                <Icon
                    as={icon}

                    color={useColorModeValue(colorThemeValues.light.borderMain, colorThemeValues.dark.borderMain)}
                    pos="relative"
                    w={8}
                    h={8}
                    bottom="0"
                    right="0"
                    top="0"
                    left="0"
                    backgroundPosition="center center"
                    borderRadius="100px"
                    border="2px solid"
                    borderColor={useColorModeValue(colorThemeValues.light.borderDetail, colorThemeValues.dark.borderDetail)}
                    opacity={.8}

                >


                </Icon>
            </Box>
        </Flex>
    )
}

export default Timeline
