import React from 'react'
import {
    Flex, Circle, Box, Image, Badge,
    useColorModeValue, Icon, chakra, Tooltip, HStack, Spacer, useToast,
} from "@chakra-ui/react"
import {MdDownload, MdInfoOutline, MdOutlinePreview, MdViewInAr, MdGridView, MdPhotoLibrary} from "react-icons/md";
import {useNavigate} from 'react-router-dom';
import '@fontsource/poppins';
import '@fontsource/inter';
import {LazyLoadImage, trackWindowScroll} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';



function GalleryCard({name, image, isNew, placeholder, small_placeholder, scrollPosition}) {
    const navigate = useNavigate();
    const formattedName = name.replace(/[_-]/g, ' ')

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
                        src={placeholder} alt={`${name}`}
                        PlaceholderSrc={small_placeholder}
                        scrollPosition={scrollPosition}
                        fit="cover"
                        effect="blur"
                    //delayTime={100}
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
                                        as={MdPhotoLibrary}
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
                                        as={MdInfoOutline}
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
                            lineHeight="tight" isTruncated
                            textAlign={'center'}
                            fontSize={{base: 'lg', sm: 'lg', md: 'lg', lg: 'xl', xl: '2xl'}}
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