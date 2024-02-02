import {extendTheme} from "@chakra-ui/react";


// color mode config
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({config});

export default theme;


