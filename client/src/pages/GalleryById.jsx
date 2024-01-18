import React from 'react'
import {Box, Heading, Text, } from '@chakra-ui/react'
import Header from '../components/UI/Header'
import {TextureDisplayById} from '../components'
import DownloadButton from '../components/UI/DownloadButton'

function GalleryById({materialId}) {
    return (<>
        <Box py='5rem'>
            <Header text={"PREVIEW MATERIALS"} />
        </Box>
        <Box px='2rem' width={'80vw'} ml='10%'>
            <TextureDisplayById materialId={materialId} />
        </Box>
    </>
    )
}

export default GalleryById