//libs
import {Outlet} from 'react-router-dom';


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