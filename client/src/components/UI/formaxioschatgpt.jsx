import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Input, Image, VStack, Text } from '@chakra-ui/react';
import EXIF from 'exif-js';
import axios from 'axios';

export default function ImageUpload() {
  const { register, handleSubmit } = useForm();
  const [fileData, setFileData] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const filePreviews = [];
    Array.from(files).forEach(file => {
      filePreviews.push(URL.createObjectURL(file));
      EXIF.getData(file, function() {
        const exifData = EXIF.getAllTags(this);
        setFileData(prevData => [...prevData, {
          filename: file.name,
          size: file.size,
          type: file.type,
          exif: exifData
        }]);
      });
    });
    setImagePreviews(filePreviews);
  };

  const onSubmit = async () => {
    try {
      const response = await axios.post('/api/upload', fileData);
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input 
          type="file" 
          multiple 
          {...register('images')} 
          onChange={handleFileChange} 
        />
        <Button mt={4} type="submit">Send Metadata</Button>
      </form>

      <VStack spacing={4} mt={4}>
        {imagePreviews.map((src, index) => (
          <Image key={index} src={src} alt={`Preview ${index}`} boxSize="100px" />
        ))}
        {fileData.map((file, index) => (
          <Text key={index}>{file.filename} - {file.size} bytes</Text>
        ))}
      </VStack>
    </Box>
  );
}
