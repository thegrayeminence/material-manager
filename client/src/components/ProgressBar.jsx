import React from 'react'
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Stack,
  Text,
} from '@chakra-ui/react'

import { useProgressStore } from '../store/store'


const steps = [
  { title: 'First', description: 'Describe Material' },
  { title: 'Second', description: 'Upload Files' },
  { title: 'Third', description: 'Generate Preview'},
]

function ProgressBar( {func} ) {
  
// const { progress, increaseProgress, decreaseProgress, resetProgress  } = useProgressStore()
// const increaseProgress = useProgressStore((state) => state.increaseProgress)


  const progress = useProgressStore((state) => state.progress)
  const activeStepText = steps[progress].description

  return (
    <Stack>
      <Stepper size='md' index={progress} gap='0'>
        {steps.map((step, index) => (
          <Step key={index} gap='0'>
            <StepIndicator>
              <StepStatus complete={<StepIcon />} />
            </StepIndicator>
            <StepSeparator _horizontal={{ ml: '0' }} />
          </Step>
        ))}
      </Stepper>
      <Text>
        Step {progress + 1}: <b>{activeStepText}</b>
      </Text>
    </Stack>

  )
}

export default ProgressBar