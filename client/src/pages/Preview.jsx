import React from 'react'
import {
  Box, Grid, VStack, Heading, Text, Stack, Flex, 
  useColorModeValue, Skeleton, SkeletonCircle, SkeletonText, 
  useBoolean, HStack 
} from '@chakra-ui/react'

import { AnimatePresence, motion } from 'framer-motion';
//components
import { ProgressBar, MaterialUploadForm, FormPreviewBox, Header, ImagePreviewGrid, GeneratedTextureDisplay, JsonDisplayModal, ImageGridUrlSrc } from '../components'
import { useMaterialStore, useProgressStore } from '../store/store';


function Preview() {
// const {progress} = useProgressStore()
// const {imagePreviews} = useMaterialStore()
// const { generatedImages } = useMaterialStore();


  return (
    <>
      <Box py='2rem'>
        <Header text={"PREVIEW MATERIALS"} />
      </Box>
      <Box px='2rem' width={'80vw'} ml='10%'>
        <ProgressBar />
        <MaterialUploadForm />
        <JsonDisplayModal />
      </Box>
      <FormPreviewBox />
      {/* <Box px='2rem' width={'80vw'} ml='10%'>
        <GeneratedTextureDisplay />
      </Box> */}
      <Box px='2rem' width={'80vw'} ml='10%'>
        {/* <ImageGridUrlSrc imagePreviews={generatedImages} /> */}
        {/* <ImagePreviewGrid imagePreviews={generatedImages} /> */}
      </Box>
     
    </>

  )
}

export default Preview