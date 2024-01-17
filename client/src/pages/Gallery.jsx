import React from 'react'
import {Box, Heading, Text, } from '@chakra-ui/react'
import Header from '../components/UI/Header'
import {TextureDisplay} from '../components'
import DownloadButton from '../components/UI/DownloadButton'

function Gallery() {
  return (<>
    <Box mt='5%' py='5rem'>
      <Header text={"PREVIEW MATERIALS"} />
    </Box>
    <Box px='2rem' width={'80vw'} ml='10%'>

      <TextureDisplay />
      <DownloadButton />
    </Box>
  </>
  )
}

export default Gallery