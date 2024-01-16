import React from 'react'
import {
  Box, Grid, VStack, Heading, Text, Stack, Flex,
  useColorModeValue, Skeleton, SkeletonCircle, SkeletonText,
  useBoolean, HStack
} from '@chakra-ui/react'

import {AnimatePresence, motion} from 'framer-motion';
//components
import {ProgressBar, MaterialUploadForm, FormPreviewBox, Header, ImagePreviewGrid, JsonDisplayModal, ImageGridUrlSrc} from '../components'
import {useMaterialStore, useProgressStore} from '../store/store';



function Preview() {
  const {progress} = useProgressStore()
  const {generatedImages} = useMaterialStore();

  return (
    <>
      <Box py='2rem'>
        <Header text={"PREVIEW MATERIALS"} />
      </Box>
      <Box px='2rem' width={'80vw'} ml='10%'>
        <ProgressBar />
        <MaterialUploadForm />
        {/* <JsonDisplayModal /> */}
      </Box>
      <FormPreviewBox />
      {progress == 2 && (
        <Box px='2rem' width={'80vw'} ml='10%'>
          <Text>{generatedImages}</Text>
          <Text>{generatedImages.image_url}</Text>
        </Box>)}
      <Box px='2rem' width={'80vw'} ml='10%'>

      </Box>


    </>

  )
}

export default Preview