import React from 'react';
import { Box, Image } from '@chakra-ui/react';
import { useMaterialStore } from '../../store/store';

const GeneratedTextureDisplay = () => {
  const { generatedImages } = useMaterialStore();

  return (
    <Box>
      {generatedImages.map((imageUrl, index) => (
        <Image key={index} src={imageUrl} alt={`Generated Texture ${index + 1}`} />
      ))}
    </Box>
  );
};

export default GeneratedTextureDisplay;
