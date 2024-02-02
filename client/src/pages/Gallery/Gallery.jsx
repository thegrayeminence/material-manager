import React, {useState, useEffect} from 'react'
import {Box, Grid, SimpleGrid, VStack, Text} from '@chakra-ui/react'
//local imports
import {TextureDisplay} from './components'
import {GalleryCard} from './components'
import {loadImagesFromFolder} from '../../config/loadImagesFromFolder'
import {StylishHeader} from '../../components'
import {PreviewBackgroundAnimation} from '../Preview/components';


function Gallery() {

  const [materials, setMaterials] = useState([])
  const folderNames = ['Stone_Slate_Tiles_Ornate', 'Rich_Maple_Flooring_Varnished', 'Rich_Mahagony_Flooring_Varnished', 'Dark_Cedar_Flooring_Worn', 'Blue_Ceramic_Flooring_Glossy', 'Brown_Oak_Flooring_Stained', 'Weathered_Cherry_Flooring_Varnished']

  useEffect(() => {
    const loadMaterials = async () => {
      const loadedMaterials = [];
      for (let folder of folderNames) {
        const images = await loadImagesFromFolder(folder);
        loadedMaterials.push({folder, images})
      }
      setMaterials(loadedMaterials);
    };
    loadMaterials();
  }, []);


  return (
    <Box width='100vw' h='100vh'>
      <Text
        fontFamily={'poppins, sans-serif'}
        fontWeight={'800'}
        mt='10%'
        textAlign='center'
        fontSize={{base: '4xl', sm: '4xl', md: '5xl', lg: '6xl', xl: '7xl'}}
        color={'whiteAlpha.600'}>
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