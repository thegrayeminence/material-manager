import {extendTheme, theme as baseTheme} from "@chakra-ui/react";

// Dracula inspired color palette for dark mode
const draculaColors = {
  background: "#282a36",
  currentLine: "#44475a",
  selection: "#44475a",
  foreground: "#f8f8f2",
  comment: "#6272a4",
  cyan: "#8be9fd",
  green: "#50fa7b",
  orange: "#ffb86c",
  pink: "#ff79c6",
  purple: "#bd93f9",
  red: "#ff5555",
  yellow: "#f1fa8c"
};

// Light mode color palette complementing the Dracula theme
const lightColors = {
  background: "#f8f8f2",
  currentLine: "#e0e0e0",
  selection: "#d6d6d6",
  foreground: "#282a36",
  comment: "#a0a1a7",
  cyan: "#76e0ea",
  green: "#5af78e",
  orange: "#ff9b53",
  pink: "#ff92d0",
  purple: "#caa9fa",
  red: "#ff6e6e",
  yellow: "#fafb70"
};

// Integrating custom colors with baseTheme colors
const colors = {
  ...baseTheme.colors,
  ...draculaColors,
  light: lightColors
};

// Override default Chakra UI styles based on color mode
const styles = {
  global: (props) => ({
    "html, body": {
      color: props.colorMode === "dark" ? draculaColors.foreground : lightColors.foreground,
      background: props.colorMode === "dark" ? draculaColors.background : lightColors.background,
      lineHeight: "base"
    },
    a: {
      color: props.colorMode === "dark" ? draculaColors.cyan : lightColors.cyan,
      _hover: {
        textDecoration: "underline"
      }
    },
    // Additional global styles can be added here
  })
};

// Color mode configuration
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const customTheme = extendTheme({colors, config, styles});

export default customTheme;



