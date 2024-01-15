import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import ImagePreviewBox from './ImagePreviewBox';

const ImageGridUrlSrc = ({ imagePreviews }) => {
    return (
        <SimpleGrid columns={[2, null, 3]} spacing="2.5rem" margin="auto" pt='5rem' >
            {imagePreviews.map((src, index) => (
                <ImagePreviewBox key={index} src={src.image_url} alt={`Preview ${index}`} />
            ))}
        </SimpleGrid>
    );
};

export default ImageGridUrlSrc;