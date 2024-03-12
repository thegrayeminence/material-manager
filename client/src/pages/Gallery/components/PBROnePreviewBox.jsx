import React, {useState} from 'react'
import {Box, VStack, Select, HStack, Text, Spacer, AspectRatio, Skeleton, useColorModeValue} from '@chakra-ui/react';
export default function PBROnePreviewBox({images, roughness}) {
    //vars for pbr.one material preview URL
    const color_map_url = `${images[0]}`;
    const height_map_url = `${images[1]}`;
    const normal_map_url = `${images[2]}`;
    const smoothness_map_url = `${images[3]}`;
    const roughness_map_url = `${roughness}`;
    const [geometry_type, set_geometry_type] = useState('sphere');
    const [environment_type, set_environment_type] = useState(1);
    const baseUrl = 'https://cdn.pbr.one/main/material-shading.html#';
    const query_params = `color_url=${color_map_url}&color_encoding=sRGB&normal_url=${normal_map_url}&roughness_url=${roughness_map_url}&roughness_encoding=sRGB&displacement_url=${height_map_url}&geometry_type=${geometry_type}&environment_index=${environment_type}&displacement_scale=0.02&normal_scale=0.25&tiling_scale=1.33&gui_enable=-1&watermark_enable=0`
    return (
        <>
            {!images || images.length < 4 && (
                <VStack
                    ml='5%'
                    p={{base: 8, sm: 5, md: 8, lg: 8, xl: 10}}
                    borderWidth="2px"
                    borderColor={'whiteAlpha.400'}
                    boxShadow={'xl'}
                    bg={useColorModeValue('whiteAlpha.200', 'blackAlpha.400')}
                    borderRadius="lg"
                    overflow="hidden"
                    backdropFilter="blur(10px)">
                    <Skeleton boxSize={500} />
                </VStack>
            )}
            {images && images.length === 4 && (
                <VStack
                    position={'relative'}
                    py={[8, 5, 8, 8, 10]}
                    borderWidth=".2rem"
                    borderColor={'whiteAlpha.400'}
                    borderStyle={'ridge'}
                    boxShadow={'base'}
                    bg={useColorModeValue('whiteAlpha.200', 'blackAlpha.400')}
                    borderRadius="lg"
                    overflow="hidden"
                    backdropFilter="blur(10px)"
                    maxW='90vw'
                    mx='auto'
                >
                    <Box
                        position={'relative'}
                        overflow={'hidden'}
                        width={'auto'}
                        h='full'
                        borderRadius={'lg'}
                        boxShadow={'base'}
                        paddingY='2.5%'
                        align='center'

                    >
                        <Box
                            as='iframe'
                            top={0}
                            left={0}
                            bottom={0}
                            right={0}
                            border='.15rem solid'
                            borderLeft={'none'}
                            borderRight={'none'}
                            borderColor='gray'
                            height={['200px', '280px', '425px', '500px']}
                            width={['350px', '500px', '750px', '900px']}
                            src={`${baseUrl}${query_params}`} >
                        </Box>
                    </Box>

                    <Spacer py={1} />
                    <Text fontWeight={'600'} fontSize={{base: 'lg', sm: 'md', md: 'lg', lg: 'xl', xl: '2xl'}} color="whiteAlpha.600">
                        Preview Settings:
                    </Text>
                    <HStack>
                        <Select
                            textColor='whiteAlpha.700'
                            borderColor='whiteAlpha.300'
                            borderWidth='.15rem'
                            boxShadow={'xl'}
                            color='whiteAlpha.700'
                            value={geometry_type}
                            onChange={(e) => set_geometry_type(e.target.value)} mb={4}>
                            <option value="sphere">Sphere</option>
                            <option value="plane">Plane</option>
                            <option value="cube">Cube</option>
                            <option value="cylinder">Cylinder</option>
                            <option value="torus">Torus</option>
                        </Select>
                        <Select textColor='whiteAlpha.700'
                            borderColor='whiteAlpha.300'
                            borderWidth='.15rem'
                            boxShadow={'xl'}
                            color='whiteAlpha.700'
                            value={environment_type}
                            onChange={(e) => set_environment_type(e.target.value)} mb={4}>
                            <option value="0">Studio</option>
                            <option value="1">Dune</option>
                            <option value="2">Forest</option>
                            <option value="3">Field</option>
                            <option value="4">Computer Lab</option>
                            <option value="5">Night</option>
                        </Select>
                    </HStack>
                </VStack>)}
        </>
    )
}