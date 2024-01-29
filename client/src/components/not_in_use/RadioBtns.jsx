import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import React from 'react';
import { useState } from "react";

export default function RadioBtns({func}) {
  return (
   <RadioGroup name="shaderType" onChange={func} value={shaderType} >
    <Stack direction='row' spacing={6}>
        <Radio colorScheme='green' value={roughness}>
            Roughness/Metallic 
        </Radio>
        <Radio colorScheme='blue' value={glossy}>
            Specular/Glossy
        </Radio>
        <Radio colorScheme='purple' value={custom}>
            Custom/Non-PBR
        </Radio>
    </Stack>
   </RadioGroup>
  )
}

