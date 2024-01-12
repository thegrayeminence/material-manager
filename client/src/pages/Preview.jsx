import React from 'react'
import { Box,Stack } from '@chakra-ui/react'
//components
import { ProgressBar } from '../components'
import { useProgressStore } from '../store/store'
import Header from '../components/Header'
import MaterialUploadForm from '../components/MaterialUploadForm'

function Preview() {



  return (
    <>
    <Box py='2rem'>
     <Header text={"PREVIEW MATERIALS"}/>
     </Box>
     <Box px='2rem' width={'80%'} ml='10%'>
     <ProgressBar/>
     <MaterialUploadForm />
     </Box>
     <Box px='2rem' width={'80%'} ml='10%'>
     </Box>
    </>
   
  )
}

export default Preview