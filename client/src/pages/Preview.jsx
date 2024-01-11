import React from 'react'
import { Box,Stack } from '@chakra-ui/react'
//components
import { ProgressBar } from '../components'
import { useProgressStore } from '../store/store'
import Header from '../components/Header'
import ShaderInfoForm from '../components/ShaderInfoForm'
import FileUpload from '../components/FileUpload'
import { useForm } from 'react-hook-form'
function Preview() {



  return (
    <>
    <Box py='2rem'>
     <Header text={"PREVIEW MATERIALS"}/>
     </Box>
     <Box px='2rem' width={'80%'} ml='10%'>
     <ProgressBar/>
     <ShaderInfoForm />
    

     </Box>
    </>
   
  )
}

export default Preview