import React from 'react'
import { Box, Grid, VStack, Heading, Text, Stack, Flex, useColorModeValue, Skeleton, SkeletonCircle, SkeletonText, useBoolean, HStack } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion';
//components
import { ProgressBar, FormPreviewBox, Header, ImagePreviewBox, ImagePreviewGrid } from '../components'
import { useMaterialStore, useProgressStore } from '../store/store'
import MaterialUploadForm from '../components/MaterialUploadForm'

  

function Preview() {
const {progress} = useProgressStore()
const {imagePreviews} = useMaterialStore()

  return (
    <>
      <Box py='2rem'>
        <Header text={"PREVIEW MATERIALS"} />
      </Box>
      <Box px='2rem' width={'80vw'} ml='10%'>
        <ProgressBar />
        <MaterialUploadForm />
      </Box>
      <FormPreviewBox />
      <Box px='2rem' width={'80vw'} ml='10%'>
        <ImagePreviewGrid imagePreviews={imagePreviews} />
      </Box>
     
    </>

  )
}

export default Preview