import React, {useState, useEffect} from 'react'
import {Box, Grid, SimpleGrid} from '@chakra-ui/react'
//local imports
import {TextureDisplay} from './components'
import {GalleryCard} from './components'
import {loadImagesFromFolder} from '../../config/loadImagesFromFolder'
import {StylishHeader} from '../../components'

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
      <StylishHeader sx={{textAlign: 'center'}} pt="10" text="Materials Gallery" />
      <Box w='90%' h='100%' >
        <SimpleGrid
          columns={[1, 1, 2, 3]}
          spacing={8}
          w='100%'
          ml='10%'
          mt='10%'
        >
          {materials.map(({folder, images}) => (
            <GalleryCard key={folder} name={folder} images={images} isNew={true} />
          ))}
        </SimpleGrid>
      </Box >
    </Box>
  )
}

export default Gallery