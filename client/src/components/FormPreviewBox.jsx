import React from 'react'
import { Box, Grid, VStack, Heading, Text, Stack, Flex, useColorModeValue, Skeleton, SkeletonCircle, SkeletonText, useBoolean, HStack } from '@chakra-ui/react'
//components
import { useMaterialStore } from '../store/store'


//font styles
const headerStyle={
 
    fontWeight:'semibold',
    color:'slateblue',
    letterSpacing:'.2rem',
    fontFamily:'Avenir Next',
      lineHeight:'1.35rem',
     
  };
  
  const bodyStyle={
  
    fontWeight:'medium',
    color:'slategrey',
    letterSpacing:'.1rem',
    fontFamily:'Avenir Next',
      lineHeight:'2rem',
      fontSize:'1.25rem'
  };
  

export default function FormPreviewBox() {

    //loading state info for preview box animation
    const [isLoaded, setIsLoaded] = useBoolean(false);
    // stateful form data vars
    const { formData, imagePreviews } = useMaterialStore();
    const { materialData } = formData;
    const { materialTextures, materialMetadata, materialType, color, elementType, condition, manifestation } = materialData;


  return (
    <Stack px='2rem' width={'80vw'} ml='10%'>
        <Box
          w="100%"
          maxW='60rem'
          overflow={'scroll'}
          margin="0 auto" 
          borderWidth='.1rem' p='2.5rem' borderRadius='2rem'
          backdropFilter='auto' shadow='lg'
        //   bg='whiteAlpha.200' 
          transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
          _hover={{
            backdropFilter: 'auto',
            backdropBlur: '10px', transform: 'scale(1.025)',
            bgGradient: useColorModeValue('linear(to-b,  #fff4e7, #e6fffd)')
          }}
        >
          <Flex
            direction="column"
            justify="center"
            align="center"
            wrap='nowrap'
            minW="100%"
            maxH='20vh'
            mb={10}
            p={10}
          >
            <Heading size='lg' mt='-4rem' sx={bodyStyle} >Material Preview</Heading>
            <Box>
              <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                <Box w="100%" p={4}>
                  {materialType && <Text sx={bodyStyle}>Shader Type:</Text>}<Text sx={headerStyle}>{materialType && materialType['label']}</Text>
                </Box>
                <Box w="100%"  p={4}>
                {materialTextures && <Text sx={bodyStyle}>Maps Used:</Text>}{materialTextures && materialTextures.map((i) => <Text sx={headerStyle} key={i['label']}>{i['label']}</Text>)}
                </Box>
                <Box w="100%" p={4}>
                {materialMetadata && <Text sx={bodyStyle}>MetaData:</Text>}{materialMetadata && materialMetadata.map((i) => <Text sx={headerStyle} key={i['label']}>{i['label']}</Text>)}
                </Box>
              </Grid>
            </Box>
            <Box>

              <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                <Box w="100%" p={4}>
                {color && <Text sx={bodyStyle}>Color:</Text>}{color && <Text sx={headerStyle}>{color}</Text>}
                </Box>
                <Box w="100%" p={4}>
                {elementType && <Text sx={bodyStyle}>Element:</Text>}{elementType && <Text sx={headerStyle}>{elementType}</Text>}
                </Box>
                <Box w="100%" p={4}>
                {manifestation && <Text sx={bodyStyle}>Object:</Text>}{manifestation && <Text sx={headerStyle}>{manifestation}</Text>}
                </Box>
                <Box w="100%"  p={4}>
                {condition && <Text sx={bodyStyle}>Condition:</Text>}{condition && <Text sx={headerStyle}>{condition}</Text>}                
                </Box>

              </Grid>
              <Box w="100%" p={0}>
                {(color||elementType||manifestation||condition) && <Text textAlign='center' sx={bodyStyle}>"{color}_{elementType}_{manifestation}_{condition}"</Text>}
              </Box>
            </Box>
          </Flex>
        </Box>



      </Stack>
  )
}

