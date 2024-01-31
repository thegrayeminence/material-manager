import React, {useState, useEffect} from 'react'
import {Box, Grid, SimpleGrid} from '@chakra-ui/react'
//local imports
import {TextureDisplay} from './components'
import {Header} from '../../components'
import {GalleryCard} from './components'
import {loadImagesFromFolder} from '../../config/loadImagesFromFolder'

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
    <Box w='90vw' h='100vh'>
      <SimpleGrid
        columns={[1, 2, 3]}
        spacing={8}
        ml='10%'
        mt='10%'


      >
        {materials.map(({folder, images}) => (
          <GalleryCard key={folder} name={folder} images={images} isNew={true} />
        ))}
      </SimpleGrid>
    </Box >
  )
}

export default Gallery