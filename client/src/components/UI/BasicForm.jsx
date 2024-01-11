import React, { useState } from 'react'
import { useForm, useController } from 'react-hook-form'
import { Select } from 'chakra-react-select';
import { DevTool } from '@hookform/devtools';
import { Input, Box, Stack, Button, Heading } from '@chakra-ui/react';

import axios from 'axios';

export default function BasicForm() {
  const getquote = () => {
    axios.get('https://api.quotable.io/random').then(res => {
      console.log(res.data.content)
      setQuote(res.data.content)
    })
      .catch(err=>console.log(err))
  }
  const [quote,setQuote] = useState('')

  const form = useForm();
  const { register, control, handleSubmit } = form;
  const onSubmit = (data) => {
    console.log(data)}

    return (
      <div>
        {/* <div>{quote.toString()}</div> */}
        <Box >
        <Button onClick={getquote}>GETQUOTE</Button>
        <Heading>{quote}</Heading>

        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" {...register("username")} />

          <label htmlFor="">Email</label>
          <input type="email" id="email" {...register("email")} />

          <label htmlFor="">Channel</label>
          <input type="text" id="channel" {...register("channel")} />

          <button type="submit">Submit</button>

        </form>
        <DevTool control={control} />
      </div>
    )
  }

