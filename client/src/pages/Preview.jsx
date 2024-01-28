import React from 'react'
import {
  Box, Flex, Spacer, Stack, useColorModeValue,
} from '@chakra-ui/react'
import {motion} from 'framer-motion';


//components
import {ProgressBar, MaterialUploadForm, FormPreviewBox, Header, ImagePreviewGrid, TextureDisplay, JsonDisplayModal, ImageGridUrlSrc} from '../components'
import {useMaterialStore, useProgressStore, useIsLoadingStore, useFormMode, useGeneratedImagesStore} from '../store/store';
import {FormPreviewBoxTabs} from '../components';
import GradientBackground from '../components/UI/GradientBackground';

const MotionBox = motion(Box);

function Preview() {
  const {progress} = useProgressStore()

  const {mode} = useFormMode();

  return (
    <>
      <Box py='2rem'>
        <Spacer py={'2.5rem'} />
        <Header text={"GENERATE TEXTURES"} />

      </Box>
      <Box px='2rem' width={'80vw'} ml='10%'>
        <MotionBox
          w="100%"
          maxW="75rem"
          position="relative"
          zIndex="2"
          margin="0 auto"
          borderWidth=".1rem"
          overflowX={'scroll'}
          px="2.5rem"
          py={"1.5rem"}
          bg={useColorModeValue('whiteAlpha.300', 'blackAlpha.400')}
          borderColor={useColorModeValue('whiteAlpha.300', 'whiteAlpha.400')}
          // textColor={useColorModeValue('whiteAlpha.800', 'whiteAlpha.800')}
          borderRadius="2rem"
          backdropFilter="blur(10px)"
          shadow="lg"
          whileHover={{
            scale: 1.05,
            backdropFilter: 'blur(20px)'
          }}
          transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
        >
          <ProgressBar />
          <MaterialUploadForm />
        </MotionBox>
      </Box>

      <Box py='2rem'>
        {progress < 2 && mode === 0 && <FormPreviewBoxTabs />}
        {progress < 3 && mode === 1 && <FormPreviewBoxTabs />}
      </Box>

      <Box width={'100vw'} height={'100%'} margin={0} padding={0} position={'fixed'} top={0} left={0}
        zIndex={-1}>
        <GradientBackground />
      </Box>
    </>

  )
}

export default Preview