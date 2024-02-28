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

import {useProgressStore} from '../../../store/store'

const steps = [
  {title: 'First', description: `Classify Material: Technical Specifications`},
  {title: 'Second', description: 'Describe Material: Physical Properties/Appearance'},
  {title: 'Third', description: 'Submit Material: Render Texture Maps From Data'},
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

    </Stack>

  )
}

export default ProgressBar