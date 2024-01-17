//library/dependencies 
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import {ChakraProvider, ColorModeScript, CSSReset} from '@chakra-ui/react';


//pages/components/style
import './styles/index.css';
import theme from './styles/theme'
import App from './App';

//router + root
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    {/* <CSSReset /> */}
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);


