import React from 'react';
import { Box, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const ImagePreviewBox = ({ src, alt }) => {
    return (
        <MotionBox
            whileHover={{ scale: 1.1 }}
            boxShadow="md"
            borderRadius="lg"
            overflow="hidden"
        >
            <Image src={src} alt={alt} objectFit="cover" />
        </MotionBox>
    );
};

export default ImagePreviewBox;
