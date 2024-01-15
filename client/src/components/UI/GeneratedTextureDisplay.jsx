import React from 'react';
import { Box, Image } from '@chakra-ui/react';
import { useMaterialStore } from '../../store/store';

const GeneratedTextureDisplay = () => {
  const { generatedImages } = useMaterialStore();
  console.log("Generated Image URLs:", generatedImages);
  
//   const image_url = generatedImages[0]
  return (
    <Box>
    {generatedImages.map((image_url, index) => (
      <Image key={index} src={image_url} alt={`Generated Texture ${index + 1}`} />
    ))}
  </Box>
  );
};

export default GeneratedTextureDisplay;
