import React from 'react'
import {Box} from '@chakra-ui/react'
import Header from '../components/UI/Header'
import {TextureDisplay} from '../components'

function Gallery() {
  return (<>
    <Box py='5rem'>
      <Header text={"PREVIEW MATERIALS"} />
    </Box>
    <Box px='2rem' width={'80vw'} ml='10%'>
      <TextureDisplay />

    </Box>
  </>
  )
}

export default Gallery