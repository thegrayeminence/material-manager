//import libs
import React from "react";
import {
  Container,
  FormControl,
  FormLabel,
  Code,
  FormErrorMessage,
  Button,
  HStack,
  useBoolean,
} from "@chakra-ui/react";
import { Select, CreatableSelect, AsyncSelect } from "chakra-react-select";
import { useForm, Controller } from "react-hook-form";

//import components + zustand states
import { useProgressStore } from "../../store/store";
import { useMaterialStore } from "../../store/store";
import FileUpload from "../FileUpload";
import { metaDataOptions, materialTypeOptions, textureMapOptionsCommon, programOptions, engineOptions } from "../../config/formInputData";


//form input data
const mappedTextureMapOptions = textureMapOptionsCommon.map((option) => ({
  ...option,
  colorScheme: option.color,
}));



export default function ShaderInfoForm() {

  // FORM STATE DATA VARS
  const increaseProgress = useProgressStore((state) => state.increaseProgress)
  const decreaseProgress = useProgressStore((state) => state.decreaseProgress)
  const resetProgress = useProgressStore((state) => state.resetProgress)
  const progress = useProgressStore((state) => state.progress)

  const [isLoading, setLoading] = useBoolean(false);


  // FORM HANDLING FUNCTIONS
  const {
    handleSubmit,
    register,
    setError,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm()

  const submit = async (data) => {
    increaseProgress()
    // setLoading.on();
    // setTimeout(() => {
    //   setLoading.off();
    //   alert(JSON.stringify(data, null, 2));
    // }, 1200);
  };

  return (

    <Container as="form" mb={12} onSubmit={handleSubmit(submit)}>

      {/* SHADER INFO */}
      <FormControl p={4}>
        <FormLabel>
          Select Material Type
        </FormLabel>
        <Select
          name="materialType"
          options={materialTypeOptions}
          placeholder="Classify your material..."
          closeMenuOnSelect={true}
          variant="flushed"
          isRequired={true}
        />
      </FormControl>


      {/* TEXTURE FILES REQUIRED */}

      <FormControl p={4}>
        <FormLabel>
          Select Texture Maps
        </FormLabel>
        <Select
          isMulti
          name="materialTextures"
          options={mappedTextureMapOptions}
          placeholder="Choose texture maps for material..."
          closeMenuOnSelect={false}
          selectedOptionStyle="check"
          hideSelectedOptions={true}
          isRequired={true}
        />
      </FormControl>

      {/* METADATA */}
      <FormControl p={4}>
        <FormLabel>
          Add Optional Meta-Data
        </FormLabel>
        <Select
          isMulti
          name="materialMetadata"
          options={metaDataOptions}
          placeholder="Add additional metadata about material..."
          closeMenuOnSelect={false}
          selectedOptionStyle="check"
          hideSelectedOptions={false}
        />
      </FormControl>

      {/* FILE UPLOAD COMPONENTS */}
      {0 < progress < 2 ?
        <FileUpload
          name="files"
          acceptedFileTypes="image/*"
          placeholder="Import Metadata"
          control={control}
          title={'Import Texture Files'}
          description={'Load necessary texture maps for material'}
          isRequired={false}
        >

        </FileUpload>
        : null
      }

  


      {/* SUBMIT/RESET/BACK BUTTONS */}
      <HStack spacing={4} py={'2.5rem'}>
        <Button
          isLoading={isLoading}
          type="button"
          colorScheme="blue"
          w="full"
          onClick={() => resetProgress()}
        >
          Reset
        </Button>

        <Button
          isLoading={isLoading}
          type="button"
          colorScheme="blue"
          w="full"
          onClick={() => decreaseProgress()}
        >
          Back
        </Button>

        <Button
          isLoading={isLoading}
          type="submit"
          colorScheme="green"
          w="full"
        >
          Next
        </Button>
      </HStack>
    </Container>

  );
};

