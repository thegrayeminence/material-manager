import {
  Stack,
  Step,
  StepIcon,
  StepIndicator,
  StepSeparator,
  StepStatus,
  Stepper,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import '@fontsource/poppins';
import '@fontsource/inter';
import {useProgressStore} from '../../../store/store'

const steps = [
  {title: 'First', description: `Step 1: Describe the Material You Want Generated`},
  {title: 'Second', description: 'Step 2: Select Optional Software Metadata'},
  {title: 'Third', description: 'Step 3: Await Processing of First Image'},
]
const stepsMode1 = [
  {title: 'First', description: 'Classify Material: Assign Technical Attributes'},
  {title: 'Second', description: 'Describe Material: Physical Properties'},
  {title: 'Third', description: 'Upload Files & Specify Texture Type'},
]



function ProgressBar({func}) {

  const {progress} = useProgressStore()
  const activeStepText = steps[progress].description




  return (
    <Stack >

      <Stepper
        colorScheme={useColorModeValue('twitter', 'purple')}
        size='md' index={progress + 1} gap='0'>
        {steps.map((step, index) => (
          <Step key={index} gap='0'>
            <StepIndicator
            >
              <StepStatus complete={<StepIcon />} />
            </StepIndicator>
            <StepSeparator _horizontal={{ml: '0'}} />
          </Step>
        ))}
      </Stepper>
      <Text fontSize={{base: 'md', sm: 'md', md: 'lg', lg: 'xl', xl: 'xl2'}} fontWeight={800} letterSpacing={'wide'} fontFamily={'poppins'} textColor={'whiteAlpha.800'} textAlign={'center'}
        textOverflow={'ellipsis'} whiteSpace={'pretty'} overflow={'hidden'}
      >
        {activeStepText}
      </Text>
    </Stack>

  )
}

export default ProgressBar