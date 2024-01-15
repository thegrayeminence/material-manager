import React from 'react';
import { Text, Box, Stack } from '@chakra-ui/react';
import { useMaterialStore } from '../../store/store';

 const FormDataJsonText = () => {
  // Access jsonFormData from the Zustand store
  // const { jsonFormData } = useMaterialStore();

  const { formData } = useMaterialStore();

  // Convert jsonFormData to formatted JSON string
  const formattedData = JSON.stringify(formData, null, 2);

  return (
    <Text whiteSpace="pre-wrap">
      {formattedData}
    </Text>
  );
};

export default FormDataJsonText;