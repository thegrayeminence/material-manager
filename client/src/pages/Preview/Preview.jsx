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
import {GradientBG_Purple, Header, StylishHeader, LightBarBackground} from '../../components';
import {useProgressStore} from '../../store/store';
import '@fontsource/poppins';
import '@fontsource/inter';

const MotionBox = motion(Box);

function Preview() {
  const {progress} = useProgressStore()

  return (
    <Box width='100vw' h='100%'
      opacity='.99' position='relative'
    >

      <Box spacing={0} width={'100%'} overflow={'hidden'} >
        <Spacer h={'5rem'} />
        <Heading textAlign='center' fontSize={{base: '4xl', sm: '4xl', md: '5xl', lg: '6xl', xl: '7xl'}}
          color={useColorModeValue('cyan.600', 'purple.500')}
          opacity={0.85}
          fontFamily={'poppins black, sans-serif'}
          py={'.5rem'}

        >
          TEXTURE FORGE
        </Heading>


        <Box maxW={'90vw'} mx='auto' h='100%' >
          <MotionBox
            w="100%"
            position="relative"
            // zIndex="2"
            margin="0 auto"
            borderWidth=".1rem"
            px="2.5rem"
            py={"1.5rem"}
            bg={useColorModeValue('whiteAlpha.200', 'blackAlpha.400')}
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
          {progress < 3 && <FormPreviewBoxTabs />}
        </Box>
        <Box width={'100vw'} height={'100%'} margin={0} padding={0} position={'fixed'} top={0} left={0}
          zIndex={-2}>
          {/* <PreviewBackgroundAnimation /> */}
          {/* <ParticlesBGAnimation /> */}
          <LightBarBackground />

        </Box>
      </Box>
      <Spacer h='60px' />
    </Box>


  )
}

export default Preview