import React, {useState} from 'react'
import {Box, VStack, Select, HStack, Text, Spacer, Skeleton} from '@chakra-ui/react';

export default function PBROnePreviewBox({images}) {

    //vars for pbr.one material preview URL
    // below functionality works for getting origin of current page, for old method of loading images from public folder
    // const parsedUrl = new URL(window.location.href);
    // const origin = parsedUrl.origin;
    // const URI_BASE = origin;


    // console.log('parsedUrl Full', parsedUrl, 'origin', origin)
    console.log('color_map_url_pbrone_src:', images[0])
    const color_map_url = images[0];
    const normal_map_url = images[1];
    const height_map_url = images[2];
    const smoothness_map_url = images[3];
    const [geometry_type, set_geometry_type] = useState('sphere');
    const [environment_type, set_environment_type] = useState(0);

    const baseUrl = 'https://cdn.pbr.one/main/material-shading.html#';
    const query_params = `color_url=${color_map_url}&normal_url=${normal_map_url}&roughness_url=${smoothness_map_url}&displacement_url=${height_map_url}&geometry_type=${geometry_type}&environment_index=${environment_type}&displacement_scale=0.01&tiling_scale=1.33&gui_enable=-1&watermark_enable=0`

    // console.log('pbr_component_urls', images)

    return (
        <>
            {!images || images.length < 4 && (
                <VStack

                    ml='5%'
                    p={{base: 8, sm: 5, md: 8, lg: 8, xl: 10}}
                    borderWidth="2px"
                    borderColor={'whiteAlpha.400'}
                    boxShadow={'xl'}
                    bg={'blackAlpha.400'}
                    borderRadius="lg"
                    overflow="hidden"
                    backdropFilter="blur(10px)">
                    <Skeleton height={500} />
                </VStack>
            )}
            {images && images.length === 4 && (
                <VStack

                    ml='5%'
                    p={{base: 8, sm: 5, md: 8, lg: 8, xl: 10}}
                    borderWidth="2px"
                    borderColor={'whiteAlpha.400'}
                    boxShadow={'xl'}
                    bg={'blackAlpha.400'}
                    borderRadius="lg"
                    overflow="hidden"

                    backdropFilter="blur(10px)">

                    <Box as='iframe' maxW='1000px' w='full' height={'500px'} src={`${baseUrl}${query_params}`}>
                    </Box>
                    <Spacer py={1} />
                    <Text fontWeight={'600'} fontSize={{base: 'lg', sm: 'md', md: 'lg', lg: 'xl', xl: '2xl'}} color="whiteAlpha.600">
                        Preview Settings:
                    </Text>

                    <HStack>

                        <Select textColor='whiteAlpha.600' borderColor='whiteAlpha.300' color='whiteAlpha.400' value={geometry_type} onChange={(e) => set_geometry_type(e.target.value)} mb={4}>
                            <option value="sphere">Sphere</option>
                            <option value="plane">Plane</option>
                            <option value="cube">Cube</option>
                            <option value="cylinder">Cylinder</option>
                            <option value="torus">Torus</option>

                        </Select>
                        <Select textColor='whiteAlpha.600' borderColor='whiteAlpha.300' color='whiteAlpha.400' value={environment_type} onChange={(e) => set_environment_type(e.target.value)} mb={4}>
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

