import React from 'react'
import { Box, Flex, Button, useColorModeValue, Stack, useColorMode, useDisclosure} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from "@chakra-ui/icons";


const NightModeToggleButton = () => {
    
    const { colorMode, toggleColorMode } = useColorMode()
  
  return(
  <>
    <Button px={4} onClick={toggleColorMode} variant='outline' size='lg'
    color={'white'} background={useColorModeValue('whiteAlpha.300','whiteAlpha.300')}
    borderRadius={6} borderWidth={2} borderColor={'whiteAlpha.700'}
    _hover={{
      backdropFilter: 'auto', borderColor: 'blue.200',
      backdropBlur: '20px', transform: 'scale(1.1)',
    }}>
    {colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
  </Button>
  </>);
  };

export default NightModeToggleButton