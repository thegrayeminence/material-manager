import React, { useState } from 'react'
import { Box, Stack, Button, Input, VStack, HStack } from '@chakra-ui/react'
//components
import { ProgressBar } from '../components'
import { useProgressStore } from '../store/store'
import Header from '../components/Header'
import ShaderInfoForm from '../components/ShaderInfoForm'
import FileUpload from '../components/FileUpload'
import { useForm } from 'react-hook-form'

//component imports
import ImageUploadInput from '../components/imageUploadInput'

export default function ImageUpload() {
  const [images, setImages] = useState([]);
  const [fileData, setFileData] = useState([]);

  const handleFileChange = (event) => {
    const fileInput = event.target;
    const files = fileInput.files;

    const newImages = Array.from(files).map((file) => {
      return {
        file,
        filename: file.name,
        /* You can add more metadata properties here if needed */
      };
    });

        setImages([...images, ...newImages]);

        // Read file content and store in state
        newImages.forEach((image) => {
          const fr = new FileReader();
          fr.onload = () => {
            setFileData([...fileData, { filename: image.filename, content: fr.result }]);
          };
          fr.readAsDataURL(image.file); // You can use other methods for different metadata
        });
      };



  const handleUpload = () => {
    // Create a FormData object to send to the server
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images', image.file);
    });

    // You can also append additional metadata to the FormData object here if needed

    // Send FormData to the server using fetch or Axios
    fetch('/uploadEndpoint', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the server response
        console.log('Server response:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
   

  return (
    <div>
      <ImageUploadInput  func={handleFileChange} />
      <Button onClick={handleUpload}>Upload</Button>

      <div>
        {images.map((image, index) => (
          <div key={index}>
            <img src={fileData[index]?.content} alt={image.filename} width="100" />
            <p>{image.filename}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

