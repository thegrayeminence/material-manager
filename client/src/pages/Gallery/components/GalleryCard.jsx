import React from 'react'
import {
    Flex, Circle, Box, Image, Badge,
    useColorModeValue, Icon, chakra, Tooltip, HStack, Spacer, useToast,
} from "@chakra-ui/react"
import {MdDownload, MdInfoOutline, MdOutlinePreview, MdViewInAr, MdGridView, MdPhotoLibrary} from "react-icons/md";
import {useNavigate} from 'react-router-dom';


function GalleryCard({name, images, isNew, showAllImages = false}) {
    const navigate = useNavigate();
    const toast = useToast();
    // const formatting = /[_]/g
    const formattedName = name.replace(/[_-]/g, ' ')

    return (
        <Flex p={5} w="full" alignItems={'center'} justifyContent={'center'}>
            <Box bg={'white'} borderWidth={'1px'} rounded={'lg'} shadow="lg" position="relative" minW='256px' h='100%'>
                {showAllImages ? (
                    images.map((src, index) => (
                        <Image key={index} src={src} alt={`${name}-${index}`} roundedTop={index === 0 ? 'lg' : 'none'} fit="cover" />
                    ))
                ) : (
                    <Image src={images[0]} alt={`${name}`} roundedTop={'lg'} fit="cover" />
                )}
                <Box p={6}>
                    <HStack justifyContent={'space-between'} alignItems={'center'}>
                        {/* New/Old Indicator */}
                        <Box display="flex"
                        >
                            {isNew && (
                                <Badge rounded="full" px="2" fontSize={'0.8em'} colorScheme='red'>
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
                                        color="gray.600"
                                        h={7} w={7}
                                        alignSelf={'center'}
                                        as={MdPhotoLibrary}
                                        onClick={() => navigate(`/gallery/${name}`)}
                                    />
                                </chakra.span>
                            </Tooltip>

                            <Spacer px='1.5' />

                            <Tooltip label="Download Material" fontSize={'md'} >
                                <chakra.span
                                >
                                    <Icon
                                        aria-label="Download"
                                        color="gray.600"
                                        h={7} w={7}
                                        alignSelf={'center'}
                                        as={MdDownload}
                                        onClick={() => {
                                            // toast({
                                            //     title: 'Not Supported Currently',
                                            //     description: "Downloads currently only supported on preview page; redirecting there now...",
                                            //     status: 'error',
                                            //     duration: 3000,
                                            //     position: 'top',
                                            //     variant: 'subtle',
                                            //     isClosable: true,
                                            //     colorScheme: 'purple',
                                            // });
                                            navigate(`/gallery/${name}`);
                                        }

                                        }
                                    />
                                </chakra.span>
                            </Tooltip>
                        </Box>

                    </HStack>
                    <Flex mt='1' justifyContent={'space-between'} alignContent={'center'}>

                        {/* Material Name: */}
                        <Box
                            fontSize="xl" fontWeight="semibold" color="gray.800"
                            lineHeight="tight" isTruncated
                        >
                            {(formattedName) || ('Untitled Material')}
                        </Box>

                        {/* Material Info Icon/Tooltip: */}
                        <Tooltip
                            label={(formattedName) || ('Untitled Material')}
                            fontSize={'md'}
                        >
                            <chakra.span>
                                <Icon
                                    aria-label="Info"
                                    color="gray.600"
                                    h={7} w={7} alignSelf={'center'}
                                    as={MdInfoOutline}
                                />
                            </chakra.span>
                        </Tooltip>

                    </Flex>

                </Box>
            </Box>

        </Flex>
    )
}

export default GalleryCard