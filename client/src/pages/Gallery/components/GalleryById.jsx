import React from 'react';
import {useParams} from 'react-router-dom';
import {Box, Heading, useColorModeValue} from '@chakra-ui/react';
import TextureDisplayById from '../components/TextureDisplayById'

function GalleryById() {
    const {id} = useParams();

    return (
        <Box width='100vw' h='100vh'
            // opacity={'99.9%'}
            // backgroundBlendMode={'difference'}
            bg={useColorModeValue('gray.400', 'gray.800')}

        >

            <Box
                bg={useColorModeValue('gray.400', 'gray.800')}

                px='2rem' width={'100%'}>
                <TextureDisplayById materialId={id} />
            </Box>
        </Box>
    );
}

export default GalleryById;