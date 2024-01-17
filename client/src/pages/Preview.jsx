import React from 'react'
import {
  Box, Flex, Spacer, Stack
} from '@chakra-ui/react'


//components
import {ProgressBar, MaterialUploadForm, FormPreviewBox, Header, ImagePreviewGrid, TextureDisplay, JsonDisplayModal, ImageGridUrlSrc} from '../components'
import {useMaterialStore, useProgressStore, useIsLoadingStore, useFormMode, useGeneratedImagesStore} from '../store/store';
import {FormPreviewBoxTabs} from '../components';
import GradientBackground from '../components/UI/GradientBackground';

function Preview() {
  const {progress} = useProgressStore()

  const {mode, incrementMode, decrementMode} = useFormMode();

  return (
    <>
      <Box py='2rem'>
        <Spacer py={'2.5rem'} />
        <Header text={"PREVIEW MATERIALS"} />

      </Box>
      <Box px='2rem' width={'80vw'} ml='10%'>
        <ProgressBar />
        <MaterialUploadForm />
        {/* <JsonDisplayModal /> */}
      </Box>
      {progress < 2 && mode === 0 && <FormPreviewBoxTabs />}
      {progress < 3 && mode === 1 && <FormPreviewBoxTabs />}

      {/* {progress === 2 && mode === 0 && (< TextureDisplay />)} */}
      {progress === 2 && mode === 0 && (
        <Box px='2rem' width={'80vw'} ml='10%'>
          <TextureDisplay />
        </Box>)}
      <Box px='2rem' width={'80vw'} ml='10%'>

      </Box>
      {/* <Box width={'100vw'} height={'100%'} margin={0} padding={0} position={'fixed'} top={0} left={0}
        zIndex={-1}>
        <GradientBackground />
      </Box> */}
    </>

  )
}

export default Preview