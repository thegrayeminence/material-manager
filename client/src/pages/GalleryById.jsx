import React from 'react';
import {useParams} from 'react-router-dom'; // Import useParams from react-router-dom
import {Box, Heading} from '@chakra-ui/react';
import Header from '../components/UI/Header';
import {TextureDisplayById} from '../components';

function GalleryById() {
    const {id} = useParams(); // Get the 'id' parameter from the URL

    return (
        <>
            <Box py='5rem'>
                <Header text={"PREVIEW MATERIALS"} />
            </Box>
            <Box px='2rem' width={'80vw'} ml='10%'>
                <TextureDisplayById materialId={id} /> {/* Pass it as 'materialId' */}
            </Box>
        </>
    );
}

export default GalleryById;