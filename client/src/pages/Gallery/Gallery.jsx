import React, {useState, useEffect} from 'react'
import {Box, Grid, SimpleGrid, VStack, Text, useColorModeValue} from '@chakra-ui/react'
//local imports
import {TextureDisplay} from './components'
import {GalleryCard} from './components'
import {loadImagesFromFolder} from '../../config/loadImagesFromFolder'
import {StylishHeader} from '../../components'
import {PreviewBackgroundAnimation} from '../Preview/components';


function Gallery() {

  const [materials, setMaterials] = useState([])
  const folderNames = [
    "Red_Silk_Fabric_Fancy",
    "Meadow_Ground_Surface_Grassy",
    "Brown_Leather_Fabric_Old",
    "Rich_Maple_Flooring_Varnished",
    "Blue_Sapphire_Gem_Chiseled",
    "White_Porcelain_Tiles_Bathroom",
    "Red_Bark_Tree_Ancient",
    "Tanned_Skin_White_Human",
    "White_Bark_Birch_Tree",
    "Pink_Diamond_Gem_Gleaming",
    "White_Marble_Countertop_Glossy",
    "Red_Silk_Carpet_Persian",
    "Blue_Ceramic_Flooring_Glossy",
    "Blue_Wallpaper_Wall_Worn",
    "Yellow_Papyrus_Paper_Ancient",
    "Red_Marble_Tiles_Raised",
    "Red_Brick_Wall_Damaged",
    "Weathered_Cherry_Flooring_Varnished",
    "Golden_Painted_Wall_Baroque",
    "Stone_Slate_Tiles_Ornate",
    "White_Alabaster_Tile_Carved",
    "Blue_Ceramic_Tile_Chipped",
    "Brown_Oak_Flooring_Stained",
    "Dark_Cedar_Flooring_Worn",
    "Brown_Bark_Tree_Mossy",
    "White_Marble_Surface_Glossy",
    "Red_Marble_Countertop_Glossy",
    "Rich_Mahagony_Flooring_Varnished",
    "Brown_Wooden_Panels_Baroque",
    "Orange_Sand_Surface_Dunes",
    "Bark_Tree_Birch_Ancient",
    "Brown_Ground_Surface_Stony",
    "Purple_Satin_Fabric_Woven",
    "Green_Ceramic_Surface_Glazed",
    "Brown_Mud_Surface_Stony",
    "Colorful_Painted_Wall_Pealing",
    "Gray_Stone_Tiles_Mossy",
    "Blue_Wallpaper_Wall_Damaged",
    "Red_Plaster_Wall_Filthy"
  ]
  const [isLoading, setisLoading] = useState(true)


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


  // useEffect(() => {
  //   const loadMaterialsOnServer = async () => {
  //     // setisLoadingBackend(true);
  //     setisLoading(true);
  //     const apiUrl = import.meta.env.VITE_API_URL

  //     const requestUrl = `${apiUrl}/api/all_images`;
  //     console.log("backend request", requestUrl)

  //     try {
  //       const response = await axios.get(requestUrl);
  //       setMaterials(response.data);
  //       console.log("materials", response.data)
  //       setisLoading(false);

  //     } catch (error) {
  //       console.error("Failed to load texture images:", error);
  //       // toast({
  //       //     title: 'Error loading texture files',
  //       //     description: error.message,
  //       //     status: 'error',
  //       //     duration: 5000,
  //       //     isClosable: true,
  //       // });
  //     }

  //   };

  //   loadMaterialsOnServer();
  // }, []);

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