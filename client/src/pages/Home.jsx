//libs
import {Outlet} from 'react-router-dom';
//components
import NavBar from './LandingPage/components/NavBar'



const Home = () => {



  return (
    <>

      <NavBar />
      <Outlet />
    </>
  )
}

export default Home