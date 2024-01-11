import React from 'react'
import { useForm, useController } from 'react-hook-form'
import { Select } from 'chakra-react-select';
import { DevTool } from '@hookform/devtools';
import { Input, Box, Stack, Button } from '@chakra-ui/react';

export default function BasicForm() {
    const axiosRequest = require('axios')
    
    const form = useForm();
    const { register, control, handleSubmit } = form;
    const onSubmit = (data) => {
        console.log(data)
    }
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" {...register("username")}/>

            <label htmlFor="">Email</label>
            <input type="email" id="email" {...register("email")}/>

            <label htmlFor="">Channel</label>
            <input type="text" id="channel" {...register("channel")}/>

            <button type="submit">Submit</button>

        </form>
        <DevTool control={control}/>
    </div>
  )
}

/* 
dropzone : file uploads 
react hook form : for register/handlesubmit/control hooks 
react select : for select/input functionality
axios : http requests
chakra ui : component styling
zod/yup : validation



*/