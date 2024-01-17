import React from 'react'
import {
  Box
} from '@chakra-ui/react'


//components
import {ProgressBar, MaterialUploadForm, FormPreviewBox, Header, ImagePreviewGrid, TextureDisplay, JsonDisplayModal, ImageGridUrlSrc} from '../components'
import {useMaterialStore, useProgressStore, useIsLoadingStore, useFormMode, useGeneratedImagesStore} from '../store/store';
import {FormPreviewBoxTabs} from '../components';


function Preview() {
  const {progress} = useProgressStore()

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
      {progress < 2 && mode === 0 && <FormPreviewBoxTabs />}
      {progress < 3 && mode === 1 && <FormPreviewBoxTabs />}

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