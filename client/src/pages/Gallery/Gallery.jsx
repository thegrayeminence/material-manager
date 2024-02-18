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
  const folderNamesOld = ['Stone_Slate_Tiles_Ornate', 'Rich_Maple_Flooring_Varnished', 'Rich_Mahagony_Flooring_Varnished', 'Dark_Cedar_Flooring_Worn', 'Blue_Ceramic_Flooring_Glossy', 'Brown_Oak_Flooring_Stained', 'Weathered_Cherry_Flooring_Varnished']
  const [isLoading, setisLoading] = useState(true)


  // useEffect(() => {
  //   const loadMaterials = async () => {
  //     const loadedMaterials = [];
  //     for (let folder of folderNamesOld) {
  //       const images = await loadImagesFromFolder(folder);
  //       loadedMaterials.push({folder, images})
  //     }
  //     setMaterials(loadedMaterials);
  //   };
  //   loadMaterials();
  // }, []);


  useEffect(() => {
    const loadMaterialsOnServer = async () => {
      // setisLoadingBackend(true);
      setisLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL

      const requestUrl = `${apiUrl}/api/all_images`;
      console.log("backend request", requestUrl)

      try {
        const response = await axios.get(requestUrl);
        setMaterials(response.data);
        console.log("materials", response.data)
        setisLoading(false);

      } catch (error) {
        console.error("Failed to load texture images:", error);
        // toast({
        //     title: 'Error loading texture files',
        //     description: error.message,
        //     status: 'error',
        //     duration: 5000,
        //     isClosable: true,
        // });
      }

    };

    loadMaterialsOnServer();
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