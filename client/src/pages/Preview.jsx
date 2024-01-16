import React from 'react'
import {
  Box, Grid, VStack, Heading, Text, Stack, Flex,
  useColorModeValue, Skeleton, SkeletonCircle, SkeletonText,
  useBoolean, HStack
} from '@chakra-ui/react'

import {AnimatePresence, motion} from 'framer-motion';
//components
import {ProgressBar, MaterialUploadForm, FormPreviewBox, Header, ImagePreviewGrid, TextureDisplay, JsonDisplayModal, ImageGridUrlSrc} from '../components'
import {useMaterialStore, useProgressStore, useIsLoadingStore, useFormMode, useGeneratedImagesStore} from '../store/store';



function Preview() {
  const {progress} = useProgressStore()
  const {generatedImages} = useGeneratedImagesStore();
  const {isLoading} = useIsLoadingStore();
  const {mode, incrementMode, decrementMode} = useFormMode();

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
      {progress < 2 && mode === 0 && <FormPreviewBox />}
      {progress < 3 && mode === 1 && <FormPreviewBox />}

      {/* {progress === 2 && mode === 0 && (< TextureDisplay />)} */}
      {progress === 2 && mode === 0 && (
        <Box px='2rem' width={'80vw'} ml='10%'>
          <TextureDisplay />
        </Box>)}
      <Box px='2rem' width={'80vw'} ml='10%'>

      </Box>


    </>

  )
}

export default Preview