//libs
import {Outlet, useOutletContext} from 'react-router-dom';
//components
import NavBar from './LandingPage/components/NavBar'
import {useDisclosure} from '@chakra-ui/react';



const Home = () => {

  const {isOpen, onOpen, onClose} = useDisclosure()

  return (
    <>

      <NavBar isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Outlet context={{isOpen: isOpen, onOpen: onOpen, onClose: onClose}} />
    </>
  )
}

export default Home