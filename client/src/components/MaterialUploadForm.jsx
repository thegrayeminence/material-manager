import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import {
  Box, Button, VStack, FormControl, FormLabel, Image, Input, Textarea
} from '@chakra-ui/react';
import { Select } from "chakra-react-select";
import { useMaterialStore } from './store'; // Adjust the import path as necessary

export default function MaterialUploadForm() {
  const { register, handleSubmit, control } = useForm();
  const queryClient = useQueryClient();
  const { fileData, setFileData, materialData, setMaterialData, imagePreviews, setImagePreviews } = useMaterialStore();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setImagePreviews(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
      setFileData(acceptedFiles.map(file => ({
        filename: file.name,
        size: file.size,
        type: file.type
      })));
    }
  });

  const materialMutation = useMutation(newMaterial => axios.post('/api/material', newMaterial), {
    onSuccess: () => {
      queryClient.invalidateQueries('materialData');
    }
  });

  const onSubmit = async (data) => {
    setMaterialData(data);
    materialMutation.mutate({ fileData, materialData });
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} p={5}>
      {/* File Upload Section */}
      {/* ... Existing file upload logic ... */}

      {/* Material Type Selection */}
      {/* ... Existing material type selection logic ... */}

      {/* Texture Maps Selection */}
      <Controller
        name="materialTextures"
        control={control}
        render={({ field }) => (
          <Select {...field} options={/* texture map options */} placeholder="Choose texture maps for material..." isMulti />
        )}
      />

      {/* Additional Metadata/Software Info */}
      <Controller
        name="materialMetadata"
        control={control}
        render={({ field }) => (
          <Select {...field} options={/* metadata options */} placeholder="Add additional metadata about material..." isMulti />
        )}
      />

      <Button mt={4} colorScheme="blue" type="submit">Submit</Button>
    </Box>
  );
}
