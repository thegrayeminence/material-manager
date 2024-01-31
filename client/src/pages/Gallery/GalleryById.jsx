import React from 'react';
import {useParams} from 'react-router-dom'; // Import useParams from react-router-dom
import {Box} from '@chakra-ui/react';
import {TextureDisplayById} from './components'
import {StylishHeader} from '../../components'

function GalleryById() {
    const {id} = useParams(); // Get the 'id' parameter from the URL

    return (
        <>
            <Box py='5rem'>
                <StylishHeader sx={{textAlign: 'center'}} pt="10" text="AVAILABLE MATERIALS" />
            </Box>
            <Box px='2rem' width={'80vw'} ml='10%'>
                <TextureDisplayById materialId={id} /> {/* Pass it as 'materialId' */}
            </Box>
        </>
    );
}

export default GalleryById;