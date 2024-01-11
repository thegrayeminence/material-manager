import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import {
    Box, Button, VStack, FormControl, FormLabel, Image, Input, Textarea, HStack, useBoolean,
} from '@chakra-ui/react';
import { Select } from "chakra-react-select";

//component imports
import { textureMapOptionsPBRMetalRough, textureMapOptionsPBRGlossSpec, textureMapOptionsCommon, materialTypeOptions, metaDataOptions } from './FormInputData';
import { useMaterialStore, useProgressStore } from '../store/store';



export default function MaterialUploadForm() {
    const { register, handleSubmit, control, watch } = useForm();
    const queryClient = useQueryClient();
    const [textureMapOptions, setTextureMapOptions] = useState([]);
    const materialType = watch("materialType");


    const { fileData, setFileData, materialData, setMaterialData, imagePreviews, setImagePreviews } = useMaterialStore();
    const { progress, increaseProgress, decreaseProgress, resetProgress } = useProgressStore();

    const handleNext = () => {
        if (progress < 2) {
            increaseProgress();
        } else {
            handleSubmit(onSubmit)(); // Call the submit function when on the last step
        }
    };

    // loads options for texture maps based on material type
    useEffect(() => {
        switch (materialType) {
            case "metallic":
                setTextureMapOptions(textureMapOptionsPBRMetalRough);
                break;
            case "glossy":
                setTextureMapOptions(textureMapOptionsPBRGlossSpec);
                break;
            default:
                setTextureMapOptions(textureMapOptionsCommon);
        }
    }, [materialType]);



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
            
            

            {/* Material Type Selection */}
            {progress === 0 && (
            <FormControl mb={4}>
                <FormLabel htmlFor="materialType">Material Type</FormLabel>
                <Controller
                    name="materialType"
                    control={control}
                    render={({ field }) => (
                        <Select {...field} options={materialTypeOptions}
                            placeholder="Select Material Type"
                            closeMenuOnSelect={true}
                            variant="flushed"
                            isRequired={true}
                        />
                    )}
                />
            </FormControl>
            )}
           

            {/* Texture Maps Selection */}
            {progress === 0 && (
            <FormControl mb={4}>
                <FormLabel htmlFor="materialTextures">Texture Maps</FormLabel>
                <Controller
                    name="materialTextures"
                    control={control}
                    render={({ field }) => (
                        <Select {...field} options={textureMapOptions}
                            placeholder="Choose texture maps for material..."
                            isMulti
                            closeMenuOnSelect={false}
                            selectedOptionStyle="check"
                            hideSelectedOptions={true}
                            isRequired={true}
                        />
                    )}
                />
            </FormControl>
            )}



            {/* Additional Metadata/Software Info */}
            {progress === 0 && (
            <FormControl mb={4}>
                <FormLabel htmlFor="materialMetadata">Additional Meta-Data</FormLabel>
                <Controller
                    name="materialMetadata"
                    control={control}
                    render={({ field }) => (
                        <Select {...field} options={metaDataOptions}
                            placeholder="Add additional metadata about material..."
                            isMulti
                            closeMenuOnSelect={false}
                            selectedOptionStyle="check"
                            hideSelectedOptions={false}
                        />
                    )}
                />
            </FormControl>
            )}



            {/* Additional Form Controls for Material Physical Attributes */}
            {progress === 1 && (
            <>
            <FormControl mb={4}>
                <FormLabel htmlFor="color">Color</FormLabel>
                <Input id="color" {...register('color')} />
            </FormControl>
            <FormControl mb={4}>
                <FormLabel htmlFor="element_type">Element/Type</FormLabel>
                <Input id="element_type" {...register('element_type')} />
            </FormControl>
            <FormControl mb={4}>
                <FormLabel htmlFor="manifestation">Manifestation</FormLabel>
                <Textarea id="manifestation" {...register('manifestation')} />
            </FormControl>
            <FormControl mb={4}>
                <FormLabel htmlFor="condition">Condition</FormLabel>
                <Textarea id="condition" {...register('condition')} />
            </FormControl>
            </>
            )}




            {/* File Upload Section */}
            {progress === 2 && (
                <>
            <FormControl mb={4}>
                <FormLabel>Upload Texture Files</FormLabel>
                <div {...getRootProps()} style={{ border: '2px dashed gray', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop files here, or click to select files</p>
                </div>
                <VStack spacing={4} mt={4}>
                    {imagePreviews.map((src, index) => (
                        <Image key={index} src={src.preview} alt={`Preview ${index}`} boxSize="100px" />
                    ))}
                </VStack>
            </FormControl>
            </>
            )}

            {/* Navigation Buttons */}
            <HStack spacing={4} py={'2.5rem'}>
                <Button colorScheme="blue" w="full" onClick={resetProgress}>Reset</Button>
                {progress > 0 && (
                    <Button colorScheme="blue" w="full" onClick={decreaseProgress}>Back</Button>
                )}
                <Button colorScheme="green" w="full" onClick={handleNext}>
                    {progress < 2 ? 'Next' : 'Submit'}
                </Button>
            </HStack>


        </Box>
    );
}
