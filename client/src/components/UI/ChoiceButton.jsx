import React from 'react'
import { Button } from '@chakra-ui/react'

export default function ChoiceButton( { text, handleClick, sx, hover } ) {
  return (
    <Button onClick={handleClick} 
    variant='outline' size='lg'
    sx={sx} _hover={hover}
    >
        {text}
    </Button>
  )
}

