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
    Divider,

} from "@chakra-ui/react"
// Here we have used react-icons package for the icons
import {FaWpforms} from "@react-icons/all-files/fa/FaWpforms"
import {BiBrain} from "@react-icons/all-files/bi/BiBrain"
import {AiOutlineSend} from "@react-icons/all-files/ai/AiOutlineSend"
import {BiLoaderCircle} from "@react-icons/all-files/bi/BiLoaderCircle"
import {BiServer} from "@react-icons/all-files/bi/BiServer"
import {MdLooksOne} from "@react-icons/all-files/md/MdLooksOne"
import {MdLooksTwo} from "@react-icons/all-files/md/MdLooksTwo"
import {MdLooks3} from "@react-icons/all-files/md/MdLooks3"
import {MdLooks4} from "@react-icons/all-files/md/MdLooks4"
import {MdLooks5} from "@react-icons/all-files/md/MdLooks5"
import {MdLooks6} from "@react-icons/all-files/md/MdLooks6"
import {MdCheckBox} from "@react-icons/all-files/md/MdCheckBox"
import {MdFileDownload} from "@react-icons/all-files/md/MdFileDownload"
import {AiOutlineCloudServer} from "@react-icons/all-files/ai/AiOutlineCloudServer"



const utfNumbersCircledRaw = ['\u24EA', '\u2461', '\u2462', '\u2463', '\u2464', '\u2465', '\u2466', '\u2467', '\u2468', '\u2469']
const utfNumbersCircled = [
    `⓵`, `⓶`, `⓷`, `⓸`, `⓹`, `⓺`, `⓻`, `⓼`, `⓽`, `⓾`
]
const timeLineData = [
    {
        id: 1,
        categories: ["Frontend", "User Input", "Request"],
        title: "User Defines Properties of Material to be Generated",
        icon: MdLooksOne,
        bigIcon: FaWpforms,
        description: `User describes/classifies the properties of the material they want generated via the inputs on the site's form`,
        date: "Time Required: 30-60 seconds"
    },
    {
        id: 2,
        categories: ["Backend", "DB Storage"],
        title: "Descriptions Sent to Backend and Re-Formatted as Prompts for SD",
        icon: MdLooksTwo,
        bigIcon: AiOutlineCloudServer,
        description: `TextureForge sends user descriptions to backend, stores them in the database, and then turns them into prompts optimally formatted for Stable Diffusion AI`,
        date: "Time Required: 10 seconds"
    },
    {
        id: 3,
        categories: ["Backend", "Text-to-Image AI", "Stable Diffusion"],
        title: "Text Prompt Sent to SD to Generate First Texture Map",
        icon: MdLooks3,
        bigIcon: BiBrain,
        description: `TextureForge sends prompts to Stable Diffusion to generate the first texture map (Albedo/BaseColor), using a text-to-image model`,
        date: "Time Required: 30-60 seconds"
    },
    {
        id: 4,
        categories: ["Backend", "DB Storage", "Response"],
        title: "First Texture Map (Color) Generated & Sent to Frontend",
        icon: MdLooks4,
        bigIcon: AiOutlineSend,
        description: `SD outputs Albedo/BaseColor texture map as a url; TextureForge stores url in database and sends it to frontend for user preview/download`,
        date: "Time Required: 15 seconds"
    },
    {
        id: 5,
        categories: ["Backend", "Image-to-Image AI", "Stable Diffusion"],
        title: "Image Prompt Sent to SD to Generate Rest of PBR Maps",
        icon: MdLooks5,
        bigIcon: BiLoaderCircle,
        description: `TextureForge sends Albedo/BaseColor texture map to SD to generate the rest of the PBR texture maps (normal, roughness, height, etc.), using an image-to-image model`,
        date: "Time Required: 30 seconds to 2 minutes"
    },
    {
        id: 6,
        categories: ["Backend", "DB Storage", "Response"],
        title: "Generated PBR Maps Cached & Sent to Frontend",
        icon: MdLooks6,
        bigIcon: BiServer,
        description: `SD outputs PBR texture maps as urls; TextureForge stores urls in database and sends them to frontend for user preview/download`,
        date: "Time Required: 15 seconds"
    },

    {
        id: 7,
        categories: ["Frontend", "User Input"],
        title: "User Downloads New Assets and Uses Them to Their Heart's Content!",
        icon: MdCheckBox,
        bigIcon: MdFileDownload,
        description: `Generated texture maps are loaded in browser for user to preview; user downloads new assets, zipped into folder with optimal file structure/naming, and then imports them/uses them however they want!`,
        date: "Time Required: N/A"
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
        icon: "cyan.300",
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

const headerStyle = {
    fontWeight: '800',
    letterSpacing: '.2rem',
    lineHeight: '1.35rem',
    textAlign: 'center',
    fontSize: ['xl', '2xl', '3xl', '4xl'],
    fontFamily: 'poppins, sans-serif',
};

const Timeline = () => {
    return (
        <Container maxWidth="full" mx="auto"
            p={{base: 6, sm: 8, md: 10, lg: 12}}


        >

            <chakra.h3
                sx={headerStyle}
                color={useColorModeValue(colorThemeValues.light.textHeader, colorThemeValues.dark.textHeader)}
                fontWeight="bold" mb={18} textAlign="center" fontSize={{base: '3xl', sm: '2xl', lg: '4xl'}}>
                How It Works:
            </chakra.h3>
            <Spacer h={4} />
            {/* <Divider
                textAlign={'center'} borderWidth={'.1rem'} w={'full'}
                borderStyle={'solid'}
                borderColor={useColorModeValue(colorThemeValues.light.textDetail, colorThemeValues.dark.textDetail)}


            /> */}

            <Spacer h={4} />
            {timeLineData.map((step, index) => (
                <Flex key={index}  >

                    <Box >
                        {/* <LineWithDot  {...step} /> */}
                        <Card  {...step} />
                        <Spacer h={6} />
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
            borderRadius="xl"
            borderStyle={'solid'}
            borderWidth={'.15rem'}
            borderColor={useColorModeValue('twitter.200', 'purple.300')}
            alignItems="center"
            pos="relative"
            bg={useColorModeValue(colorThemeValues.light.componentMain, colorThemeValues.dark.componentMain)}
            boxShadow={'2xl'}



        >
            <VStack align={'center'} spacing={8} >
                <Icon as={icon} w={12} h={12}
                    color={useColorModeValue(colorThemeValues.light.highlight, colorThemeValues.dark.highlight)}
                />
                <Icon as={bigIcon} w={12} h={12}
                    color={useColorModeValue(colorThemeValues.light.icon, colorThemeValues.dark.icon)}
                />
            </VStack>
            <Box

            >

                {/* <HStack spacing={1} mb={1} overflow={'clip'}
                    whiteSpace={'nowrap'} textOverflow={'ellipsis'}

                >
                    {categories.map(cat => (
                        <Badge size='sm' key={cat}
                            colorScheme={useColorModeValue('facebook', 'purple')}
                            variant='subtle'
                        // noOfLines={1}
                        >
                            {`${cat}`}
                        </Badge>
                    ))}
                </HStack> */}
                <VStack spacing={2} mb={3} >
                    <Text
                        color={useColorModeValue(colorThemeValues.light.textHeader, colorThemeValues.dark.textHeader)}
                        fontSize={{base: "xl", sm: "lg", md: "xl", lg: 'xl', xl: "2xl"}}
                        fontWeight="800"
                        whiteSpace={'pretty'}
                        overflow={'hidden'}
                        alignSelf={'start'}

                    >
                        {title}
                    </Text>
                    <Text
                        fontWeight="600" fontSize={{base: "lg", sm: "md", md: "lg", lg: 'lg', xl: "xl"}}
                        color={useColorModeValue(colorThemeValues.light.textMain, colorThemeValues.dark.textMain)}
                        whiteSpace={'pretty'}
                        overflow={'hidden'}
                        alignSelf={'start'}

                    >
                        {description}
                    </Text>
                </VStack>
                <Text fontSize="sm" color={'gray.400'}
                    alignSelf={'start'}

                >{date}</Text>
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
