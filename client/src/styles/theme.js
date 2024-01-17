import {extendTheme} from "@chakra-ui/react";


const colors = {
  primary: {
    100: "#E5FCF1",
    200: "#27EF96",
    300: "#10DE82",
    400: "#0EBE6F",
    500: "#0CA25F",
    600: "#0A864F",
    700: "#086F42",
    800: "#075C37",
    900: "#064C2E"
  },
  // Adding a grey color palette for suggestions
  grey: {
    100: "#f7f7f7",
    200: "#e1e1e1",
    300: "#cfcfcf",
    400: "#b1b1b1",
    500: "#9e9e9e", // This could be the color for your placeholders/suggestions
    600: "#7e7e7e",
    700: "#626262",
    800: "#515151",
    900: "#3b3b3b"
  },
  // Specific color for placeholders if preferred
  placeholder: "#9e9e9e" // Light grey color
};

// color mode config
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({colors, config});

export default theme;
