//libs
import {Outlet, useNavigate, Navigate} from 'react-router-dom';


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