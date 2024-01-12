import React from 'react'
import { Box, Grid, VStack, Heading, Text, Stack, Flex, useColorModeValue, Skeleton, SkeletonCircle, SkeletonText, useBoolean, HStack } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion';
//components
import { ProgressBar, FormPreviewBox, Header } from '../components'
import { useMaterialStore } from '../store/store'
import MaterialUploadForm from '../components/MaterialUploadForm'


  

function Preview() {
 

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
     
    </>

  )
}

export default Preview