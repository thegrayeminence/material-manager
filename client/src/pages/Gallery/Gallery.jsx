import React, {useState, useEffect} from 'react'
import {Box, Grid, SimpleGrid, VStack, useToast, Text, useColorModeValue, Skeleton, Spacer} from '@chakra-ui/react'
import axios from 'axios';
import {LazyLoadImage, trackWindowScroll} from 'react-lazy-load-image-component';

import '@fontsource/poppins';
import '@fontsource/inter';

//local imports
import {GalleryCard} from './components'
import {PreviewBackgroundAnimation} from '../Preview/components';
import '../LandingPage/landingPage.scss'


function GradientBackground() {

  return (
    <Box className="background-animation"
      height={'100vh'}
      width={'100vw'}
      position={'absolute'}
      top={0} left={0}
      zIndex={0}

      opacity={useColorModeValue('.2', '.2')}
      backgroundBlendMode={useColorModeValue('luminosity', 'overlay')}
    // backdropFilter={'blur(20px)'}

    >

    </Box>

  )
}




function Gallery({scrollPosition}) {

  const [materials, setMaterials] = useState([])
  const [folders, setFolders] = useState([])
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true)
  // console.log("materials", materials, "folders", folders);


  //functionality for getting image urls/data from backend
  useEffect(() => {
    const loadStaticImage = async () => {
      setIsLoading(true);
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const foldersResponse = await axios.get(`${apiUrl}/api/image_folders`);
        const materialsResponse = await axios.get(`${apiUrl}/api/gallery_images`);
        setFolders(foldersResponse.data.folders);
        setMaterials(materialsResponse.data);
        console.log("materials response", materialsResponse.data);


      } catch (error) {
        console.error("Failed to load static images:", error);
        toast({
          title: 'Error loading texture files',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
      finally {
        setIsLoading(false);
      }
    };
    loadStaticImage();
  }, []);


  return (
    <Box
      width='100vw' h='100%'
      opacity={'99.9%'}
      // backgroundBlendMode={'difference'}
      position={'relative'}
    >
      <Box spacing={0} width={'100%'} overflow={'hidden'} >
        <Text
          backgroundClip={'text'}

          fontFamily={'poppins black, sans-serif'}
          fontWeight={'800'}
          mt='10%'
          textAlign='center'
          fontSize={{base: '4xl', sm: '4xl', md: '5xl', lg: '6xl', xl: '7xl'}}
          color={useColorModeValue('twitter.500', 'purple.400')}
          opacity={0.99}

        >
          {`COMMUNITY GALLERY:`}
        </Text>
        <Box maxW='90vw' h='100%' >

          <SimpleGrid
            columns={[1, 1, 2, 3]}
            spacing={8}
            w='100%'
            ml='5%'

          >
            {materials.map(({folder, image, placeholder, small_placeholder}) => (
              <Skeleton isLoaded={!isLoading} key={folder} >
                <GalleryCard scrollPosition={scrollPosition} key={folder} name={folder} image={image} placeholder={placeholder} small_placeholder={small_placeholder} isNew={true} />
              </Skeleton>
            ))}
          </SimpleGrid>
        </Box >
        <Box width={'100vw'} height={'100%'} margin={0} padding={0} position={'fixed'} top={0} left={0}
          zIndex={-2}>
          <GradientBackground />
          <PreviewBackgroundAnimation />

        </Box>
      </Box>
      <Spacer h='60px' />
    </Box>
  )
}

export default trackWindowScroll(Gallery);
