
import React from 'react';
import { Image, SimpleGrid } from '@chakra-ui/react';
import { useMaterialStore, useProgressStore } from '../store/store';



const ImageGrid = ({ imagePreviews }) => {


    return (
        <>
        {/* <SimpleGrid columns={3} spacing={10}>
            {imagePreviews.map((file, index) => (
                <Image key={index} src={file.preview} alt={`Preview ${index}`} />
            ))}
        </SimpleGrid> */}
        </>
    );
};

export default ImageGrid;
