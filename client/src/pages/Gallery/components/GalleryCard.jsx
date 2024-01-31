import React from 'react'
import {
    Flex, Circle, Box, Image, Badge,
    useColorModeValue, Icon, chakra, Tooltip, useBreakpointValue
} from "@chakra-ui/react"
import {MdDownload} from "react-icons/md";





function GalleryCard({name, images, isNew, ...props}) {
    console.log("images:", images[0])
    console.log("name:", name)
    return (
        <Flex
            p={5} w="full" alignItems={'center'} justifyContent={'center'}>
            <Box
                bg={'white'}
                borderWidth={'1px'}
                rounded={'lg'}
                shadow="lg"
                position="relative"
                minH='256px'
                w='100%'
            >
                {/* Base Color Image */}
                <Image
                    src={images[0]}
                    alt={`${name}`}
                    roundedTop={'lg'}
                    fit="cover"

                />

                <Box p={6}>
                    {/* New/Old Indicator */}
                    <Box display="flex" alignItems="baseline">
                        {isNew && (
                            <Badge rounded="full" px="2" fontSize={'0.8em'} colorScheme='red'>
                                New
                            </Badge>
                        )}
                    </Box>

                    <Flex mt='1' justifyContent={'space-between'} alignContent={'center'}>
                        {/* Material Name: */}
                        <Box
                            fontSize="xl" fontWeight="semibold" color="gray.800"
                            lineHeight="tight" isTruncated
                        >
                            {(name) || ('Untitled Material')}
                        </Box>
                        {/* Download Icon: */}
                        <Tooltip
                            label="Download"
                            bg='white'
                            placement={'top'}
                            color='transparent'
                            fontSize={'1em'}
                        >
                            <Icon
                                aria-label="Download"
                                color="gray.600"
                                h={7} w={7} alignSelf={'center'}
                                as={MdDownload}
                            />
                        </Tooltip>
                    </Flex>

                </Box>
            </Box>

        </Flex>
    )
}

export default GalleryCard