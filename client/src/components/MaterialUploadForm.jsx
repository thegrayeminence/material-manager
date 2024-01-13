import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useDropzone } from 'react-dropzone';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import {
    Box, Button, VStack, FormControl, FormLabel, Image, Input, Textarea, HStack, useBoolean,
} from '@chakra-ui/react';
import { Select } from "chakra-react-select";

//component imports
import { textureMapOptionsPBRMetalRough, textureMapOptionsPBRGlossSpec, textureMapOptionsCommon, materialTypeOptions, metaDataOptions } from '../config/formInputData';
import { useMaterialStore, useProgressStore } from '../store/store';



export default function MaterialUploadForm() {

    //react-hook-form
    const { register, handleSubmit, control, watch, reset, setError, setFocus, setValue } = useForm();

    //query client
    const queryClient = useQueryClient();
    const [textureMapOptions, setTextureMapOptions] = useState(textureMapOptionsCommon);

    //hook form watch fields
    const materialType = watch("materialType");
    const materialMetadata = watch("materialMetadata");
    const materialTextures = watch("materialTextures");
    const color = watch("color");
    const elementType = watch("elementType");
    const condition = watch("condition");
    const manifestation = watch("manifestation");


    //zustand global states
    const { formData, setFileData, setMaterialData, imagePreviews, setImagePreviews } = useMaterialStore();
    const { progress, increaseProgress, decreaseProgress, resetProgress } = useProgressStore();

    const defaultTextureMapSelections = {
        metallic: textureMapOptionsPBRMetalRough,
        glossy: textureMapOptionsPBRGlossSpec,
        custom: [],
    };

    //### USE EFFECTS ####//
    // ------------------ //    
    // auto loads/renders options/selections for texture maps based on material type selection
    useEffect(() => {
        if (materialType && materialType.value) {
            // Get the default texture maps for the selected material type
            const defaultTextures = defaultTextureMapSelections[materialType.value];
            if (materialType.value === "custom") {
                setValue('materialTextures', defaultTextures);
                setTextureMapOptions(textureMapOptionsCommon);
                return;
            }

            if (defaultTextures) {
                setTextureMapOptions(defaultTextures);
                setValue('materialTextures', defaultTextures);
            }
        }
    }, [materialType, setValue]);


    useEffect(() => {
        // cleanup function 4 memory leak prevantage; called when components unmount/imagePreviews arr changes
        return () => {
            imagePreviews.forEach(preview => {
                if (preview.preview) {
                    // revoke blob URL to free up memory
                    URL.revokeObjectURL(preview.preview);
                }
            });
        };
    }, [imagePreviews]); // cleanup function runs when imagePreviews changes


    //updates zustand state with form data upon changing any of the form fields
    useEffect(() => {
        setMaterialData({ ...formData.materialData, materialTextures, materialType, materialMetadata, color, elementType, condition, manifestation });
        console.table(formData.materialData)
    }, [materialTextures, materialType, materialMetadata, color, elementType, condition, manifestation, setMaterialData]);



    //logs image preview file data if using async method (fileapi vs base64)
    useEffect(() => {
        console.log(imagePreviews);
    }, [imagePreviews]);


    //react-dropzone integration
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

    //HTTP POST REQUESTS & ASYNCHRONOUS STUFF//
    // ---------------- //
    //react-query + axios integration
    const materialMutation = useMutation(newMaterial => axios.post('/api/material', newMaterial), {
        onSuccess: () => {
            queryClient.invalidateQueries('materialData');
        }
    });

    //submit handler via mutation function using axios post request
    const onSubmit = async () => {
        try {
            console.log("Submitting:", { fileData: formData.fileData, materialData: formData.materialData });
            alert(JSON.stringify({ imagePreviews: imagePreviews, fileData: formData.fileData, materialData: formData.materialData }, null, 2));

            // await materialMutation.mutateAsync({ fileData: formData.fileData, materialData: formData.materialData });
        } catch (error) {
            // Handle submission error
            console.error("Submission error:", error);
        }
    };

    // ### HELPER FUNCTIONS ### //
    // ----------------------- //
    //handles navigation between form steps via progress var state

    const handleNext = () => {
        if (progress < 2) {
            increaseProgress();
        } else {
            handleSubmit(onSubmit)();
        }
    };

    const flushFormData = () => {
        let defaultValues = {};
        defaultValues.materialTextures = [];
        defaultValues.materialType = [];
        defaultValues.materialMetadata = [];
        defaultValues.color = "";
        defaultValues.elementType = "";
        defaultValues.condition = "";
        defaultValues.manifestation = "";
        reset({ ...defaultValues });
        resetProgress();
        console.log("Form Data Flushed! Default Values Set To:", FormData );
        setImagePreviews([]);
        setFileData([]);
        setMaterialData({});
    }


    return (
        <>
            <Box as="form" onSubmit={handleSubmit(onSubmit)} p={5}>



                {/* Material Type Selection */}
                {progress === 0 && (
                    <FormControl mb={4}>
                        <FormLabel htmlFor="materialType">Material Type</FormLabel>
                        <Controller
                            name="materialType"
                            id="materialType"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={materialTypeOptions}
                                    placeholder="Select Material Type"
                                    closeMenuOnSelect={true}
                                    variant="flushed"
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
                                <Select 
                                    {...field} 
                                    options={textureMapOptions}
                                    placeholder="Choose texture maps for material..."
                                    isMulti
                                    closeMenuOnSelect={false}
                                    selectedOptionStyle="check"
                                    hideSelectedOptions={true}
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
                            id="materialMetadata"
                            control={control}
                            render={({ field }) => (
                                <Select {...field} 
                                    options={metaDataOptions}
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



                {/* Additional Form Controls for Material Physical Attributes:Row1 */}
                {progress === 1 && (
                    <HStack spacing={4} py={'.5rem'}>
                        <FormControl mb={4}>
                            <FormLabel htmlFor="color">Color/Shade/Luminosity</FormLabel>
                            <Input
                                id="color"
                                name="color"
                                {...register('color')}
                                placeholder="Blue, Red, Grey, Bright, Dark, etc."
                            />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel htmlFor="elementType">Element/Type</FormLabel>
                            <Input
                                id="elementType"
                                name="elementType"
                                {...register('elementType')}
                                placeholder="Steel, Diamond, Ceramic, Textile, Gold, etc."
                            />
                        </FormControl>
                    </HStack>
                )}

                {/* Additional Form Controls for Material Physical Attributes: Row2 */}
                {progress === 1 && (
                    <HStack spacing={4} py={'.5rem'}>
                        <FormControl mb={4}>
                            <FormLabel htmlFor="manifestation">Manifestation/Form</FormLabel>
                            <Input
                                id="manifestation"
                                name="manifestation"
                                {...register('manifestation')}
                                placeholder="Railing, Carpet, Tile, Book, Leaf, Skin, etc. "
                            />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel htmlFor="condition">Condition</FormLabel>
                            <Input
                                id="condition"
                                name="condition"
                                {...register('condition')}
                                placeholder="Rusted, Polished, Dusty, Clean, Old, etc."
                            />
                        </FormControl>
                    </HStack>
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
                                {imagePreviews && imagePreviews.map((src, index) => (
                                    <Image key={index} src={src.preview} alt={`Preview ${index}`} boxSize="100px" />
                                ))}
                            </VStack>
                        </FormControl>
                    </>
                )}


                {/* Navigation Buttons */}
                <HStack spacing={4} py={'1rem'}>
                    <Button colorScheme="blue" w="full" onClick={() => flushFormData()}>Reset</Button>
                    {progress > 0 && (
                        <Button colorScheme="blue" w="full" onClick={decreaseProgress}>Back</Button>
                    )}
                    <Button colorScheme="green" w="full" onClick={handleNext}>
                        {progress < 2 ? 'Next' : 'Submit'}
                    </Button>
                </HStack>


            </Box>
            <DevTool control={control} />
        </>
    );
}
