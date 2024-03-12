import React from 'react'
import {
    Flex, Circle, Box, Image, Badge,
    useColorModeValue, Icon, chakra, Tooltip, HStack, Spacer, useToast,
} from "@chakra-ui/react"
import {IoInformationCircleOutline} from "@react-icons/all-files/io5/IoInformationCircleOutline"
import {IoMdPhotos} from "@react-icons/all-files/io/IoMdPhotos"
import {IoIosFolderOpen} from "@react-icons/all-files/io/IoIosFolderOpen"
import {BiDownload} from "@react-icons/all-files/bi/BiDownload"
import {useNavigate} from 'react-router-dom';
import '@fontsource/poppins';
import '@fontsource/inter';
import {LazyLoadImage, trackWindowScroll} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';



function GalleryCard({name, image, title, isNew, placeholder, small_placeholder, scrollPosition}) {
    const navigate = useNavigate();
    const formattedName = title.replace(/[_-]/g, ' ')

    return (
        <Flex p={5} w="full" alignItems={'center'} justifyContent={'center'}>
            <Box
                bg={useColorModeValue('whiteAlpha.400', 'blackAlpha.400')}
                borderWidth={'2px'} borderColor={useColorModeValue('whiteAlpha.600', 'whiteAlpha.600')}
                rounded={'lg'} boxShadow={'xl'} borderRadius="lg"
                position="relative" minW='256px' h='100%'
                overflow="hidden" backdropFilter="blur(5px)"

            >
                {true && (
                    <LazyLoadImage
                        src={placeholder} alt={`${title}`}
                        PlaceholderSrc={small_placeholder}
                        scrollPosition={scrollPosition}
                        fit="cover"
                        effect="blur"
                    // delayTime={100}
                    />
                )}
                <Box p={6}>
                    <HStack justifyContent={'space-between'} alignItems={'center'}>
                        {/* New/Old Indicator */}
                        <Box display="flex"
                        >
                            {isNew && (
                                <Badge rounded="full" px="2" fontSize={'0.8em'} colorScheme={useColorModeValue('green', 'purple')}>
                                    New
                                </Badge>
                            )}
                        </Box>
                        <Box display='flex' flexGrow={1} />
                        <Box display='flex' >
                            <Tooltip label="View Material" fontSize={'md'} >
                                <chakra.span>
                                    <Icon
                                        aria-label="Download"
                                        color={useColorModeValue('gray.300', 'gray.200')}
                                        h={7} w={7}
                                        alignSelf={'center'}
                                        as={IoMdPhotos}
                                        onClick={() => navigate(`/gallery/${name}`)}
                                    />
                                </chakra.span>
                            </Tooltip>

                            <Spacer px='1.5' />
                            <Tooltip
                                label={(formattedName) || ('Untitled Material')}
                                fontSize={'md'}
                            >
                                <chakra.span>
                                    <Icon
                                        aria-label="Info"
                                        color={useColorModeValue('gray.300', 'gray.200')}

                                        h={7} w={7} alignSelf={'center'}
                                        as={IoInformationCircleOutline}
                                    />
                                </chakra.span>
                            </Tooltip>

                        </Box>

                    </HStack>
                    <Flex mt='1' justifyContent={'space-evenly'} alignContent={'center'}>

                        {/* Material Name: */}
                        <Box
                            fontWeight="600" fontFamily={'poppins, sans-serif'}
                            color={useColorModeValue('gray.300', 'gray.200')}
                            lineHeight="tight"
                            noOfLines={[1, 2]}
                            whiteSpace={'pretty'}
                            overflow={'hidden'}
                            // textOverflow={'ellipsis'}
                            textAlign={'center'}
                            fontSize={{base: 'lg', sm: 'lg', md: 'md', lg: 'lg', xl: 'xl'}}
                        >
                            {(formattedName) || ('Untitled Material')}
                        </Box>

                    </Flex>

                </Box >
            </Box >

        </Flex >
    )
}

export default GalleryCard