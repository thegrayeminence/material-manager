//libs
import React from 'react'
import {Box, Spacer, useColorModeValue, Heading} from '@chakra-ui/react'
import {motion} from 'framer-motion';

//components/state
import {
  MaterialUploadForm,
  ProgressBar,
  FormPreviewBoxTabs,
  PreviewBackgroundAnimation
} from './components';
import {GradientBG_Purple, Header, StylishHeader} from '../../components';
import {useProgressStore, useFormMode} from '../../store/store';


const MotionBox = motion(Box);

function Preview() {
  const {progress} = useProgressStore()
  const {mode} = useFormMode();

  return (
    <>
      <Box py='2rem'>
        <Spacer py={'2.5rem'} />
        <Heading textAlign='center' fontSize={{base: '4xl', sm: '4xl', md: '5xl', lg: '6xl', xl: '7xl'}}
          color={useColorModeValue('whiteAlpha.600', 'whiteApha.600')}
        >
          GENERATE TEXTURES
        </Heading>

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
          bg={useColorModeValue('whiteAlpha.400', 'blackAlpha.400')}
          borderColor={useColorModeValue('twitter.400', 'purple.400')}
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
        {/* <GradientBG_Purple /> */}
        <PreviewBackgroundAnimation />
      </Box>
    </>

  )
}

export default Preview