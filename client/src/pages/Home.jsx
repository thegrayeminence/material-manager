//libs
import {Outlet, useNavigate, Navigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {Stack, Box, ButtonGroup, useColorModeValue} from '@chakra-ui/react';

//components
import {NavBar} from '../components'
//state


const Home = () => {



  return (
    <>

      <NavBar />
      <Outlet />
    </>
  )
}

export default Home