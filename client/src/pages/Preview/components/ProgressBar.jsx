import {
  Stack,
  Step,
  StepIcon,
  StepIndicator,
  StepSeparator,
  StepStatus,
  Stepper,
  Text
} from '@chakra-ui/react'
import React from 'react'

import {useFormMode, useProgressStore} from '../../../store/store'

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

  const {mode} = useFormMode();
  const progress = useProgressStore((state) => state.progress)
  const activeStepText = steps[progress].description




  return (
    <Stack>
      {mode === 0 && (
        <Stepper size='md' index={progress} gap='0'>
          {steps.map((step, index) => (
            <Step key={index} gap='0'>
              <StepIndicator>
                <StepStatus complete={<StepIcon />} />
              </StepIndicator>
              <StepSeparator _horizontal={{ml: '0'}} />
            </Step>
          ))}
        </Stepper>)}

      {mode === 1 && (
        <Stepper size='md' index={progress} gap='0'>
          {stepsMode1.map((step, index) => (
            <Step key={index} gap='0'>
              <StepIndicator>
                <StepStatus complete={<StepIcon />} />
              </StepIndicator>
              <StepSeparator _horizontal={{ml: '0'}} />
            </Step>
          ))}
        </Stepper>)}
      <Text>
        Step {progress + 1}: <b>{activeStepText}</b>
      </Text>
    </Stack>

  )
}

export default ProgressBar