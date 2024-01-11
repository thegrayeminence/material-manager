//libs
import { Outlet, useNavigate, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Stack, Box, ButtonGroup, useColorModeValue } from '@chakra-ui/react';

//components
import { ChoiceButton } from '../components';
import { NavBar } from '../components'
import Header from '../components/Header';
import LandingPage from './LandingPage';
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