//libs
import React from 'react'
import {Box, Spacer} from '@chakra-ui/react'
import {motion} from 'framer-motion';

//components/state
import {
  MaterialUploadForm,
  ProgressBar,
  FormPreviewBoxTabs,
} from './components';
import {GradientBG_Purple, Header} from '../../components';
import {useProgressStore, useFormMode} from '../../store/store';


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
          bg='whiteAlpha.300'
          borderColor='teal.500'
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
        <GradientBG_Purple />
      </Box>
    </>

  )
}

export default Preview