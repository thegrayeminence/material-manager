import React, {useState, useEffect} from 'react'
import {Box, Grid, SimpleGrid, VStack, Text, useColorModeValue} from '@chakra-ui/react'
//local imports
import {TextureDisplay} from './components'
import {GalleryCard} from './components'
import {loadImagesFromFolder} from '../../config/loadImagesFromFolder'
import {StylishHeader} from '../../components'
import {PreviewBackgroundAnimation} from '../Preview/components';
import axios from 'axios'


function Gallery() {

  const [materials, setMaterials] = useState([])
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const loadMaterials = async () => {
      setIsLoading(true);
      try {
        //const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/';
        console.log(`${import.meta.env.VITE_API_URL}images/all`)

        const response = await axios.get(`${import.meta.env.VITE_API_URL}images/all`);
        setMaterials(response.data);
        console.log('response.data:', response.data)

      } catch (error) {
        console.error("Failed to load materials:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMaterials();
  }, []);




  return (
    <Box width='100vw' h='100vh'
      opacity={'99.9%'}
    // backgroundBlendMode={'difference'}
    >
      <Text
        backgroundClip={'text'}

        fontFamily={'poppins, sans-serif'}
        fontWeight={'800'}
        mt='10%'
        textAlign='center'
        fontSize={{base: '4xl', sm: '4xl', md: '5xl', lg: '6xl', xl: '7xl'}}
        color={useColorModeValue('teal.600', 'purple.600')}
        opacity={0.8}

      >
        {`MATERIALS GALLERY:`}
      </Text>
      <Box maxW='90%' h='100%' >

        <SimpleGrid
          columns={[1, 1, 2, 3]}
          spacing={8}
          w='100%'
          ml='5%'

        >
          {materials.map(({folder, images}) => (
            <GalleryCard key={folder} name={folder} images={images} isNew={true} />
          ))}
        </SimpleGrid>
      </Box >
      <Box width={'100vw'} height={'100%'} margin={0} padding={0} position={'fixed'} top={0} left={0}
        zIndex={-1}>
        <PreviewBackgroundAnimation />
      </Box>
    </Box>
  )
}

export default Gallery