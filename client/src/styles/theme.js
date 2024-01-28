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
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

// Function to return custom styles for chakra-react-select components
// export const customSelectStyles = {
//   menu: (provided) => ({
//     ...provided,
//     bg: 'whiteAlpha.200',
//     backdropFilter: 'blur(10px)',
//     // other custom styles
//   }),
//   // other custom styles for select
// };



// // Define the variantFlushed function
// const variantFlushed = (theme) => {

//   return {
//     field: {
//       borderBottom: "1px solid",
//       borderColor: "inherit",
//       borderRadius: "0",
//       px: "0",
//       bg: "transparent",
//       _readOnly: {
//         boxShadow: "none !important",
//         userSelect: "all",
//       },
//       _invalid: {
//         borderColor: theme.colors.red[500],
//         boxShadow: `0px 1px 0px 0px ${theme.colors.red[500]}`,
//       },
//       _focusVisible: {
//         borderColor: theme.colors.blue[500],
//         boxShadow: `0px 1px 0px 0px ${theme.colors.blue[500]}`,
//       },
//     },
//     addon: {
//       borderBottom: "2px solid",
//       borderColor: "inherit",
//       borderRadius: "0",
//       px: "0",
//       bg: "transparent",
//     },
//   };
// };


// const components = {
//   Select: {
//     variants: {
//       custom: (theme) => {
//         const flushedStyles = variantFlushed(theme);

//         return {
//           ...flushedStyles,
//           menu: {
//             ...flushedStyles.menu,
//             bg: 'whiteAlpha.200',
//             // backdropFilter: 'blur(10px)',
//             // other custom styles
//           },
//           // other subcomponents like option, control, etc.
//         };
//       },
//     },
//   },
//   Toast: {
//     // base styles for the Toast container
//     baseStyle: {
//       maxWidth: '400px',
//       border: '2px solid',
//       borderColor: 'blue.500',
//       borderRadius: '10px',
//       boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.05)',
//     },
//     // default variant for the Toast
//     defaultProps: {
//       variant: 'solid',
//     },
//     // variants can be used to define different styles
//     variants: {
//       solid: {
//         bg: 'blue.500',
//         color: 'white',
//       },
//       subtle: {
//         bg: 'gray.50',
//         color: 'gray.800',
//       },
//       // add more variants if needed
//     },
//   },

// };

const theme = extendTheme({colors, config});

export default theme;