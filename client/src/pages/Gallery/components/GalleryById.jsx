import React from 'react';
import {useParams} from 'react-router-dom'; // Import useParams from react-router-dom
import {Box, Heading, useColorModeValue} from '@chakra-ui/react';
import TextureDisplayById from '../components/TextureDisplayById'

function GalleryById() {
    const {id} = useParams(); // Get the 'id' parameter from the URL

    return (
        <Box width='100vw' h='100vh'
            // opacity={'99.9%'}
            // backgroundBlendMode={'difference'}
            bg={useColorModeValue('gray.400', 'black')}

        >

            <Box
                bg={useColorModeValue('gray.400', 'black')}

                px='2rem' width={'100%'}>
                <TextureDisplayById materialId={id} /> {/* Pass it as 'materialId' */}
            </Box>
        </Box>
    );
}

export default GalleryById;