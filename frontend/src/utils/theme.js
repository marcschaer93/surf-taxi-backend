import { createTheme } from "@mui/material/styles";
import { orange, green } from "@mui/material/colors";
import { Button } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#252530", // Dark mode primary color
    },
    secondary: {
      main: "#d41b64", // Dark mode secondary color
    },
    background: {
      default: "#ffffff", // Light mode background color
      paper: "#f5f5f5", // Light mode paper color (for cards, etc.)
    },
    contrast: {
      main: "#d41b64", // Your custom contrast color
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    fontSize: 14,
  },
  darkMode: {
    palette: {
      mode: "dark",
      primary: {
        main: "#ffffff", // Light mode primary color
      },
      secondary: {
        main: "#000000", // Light mode secondary color
      },
      background: {
        default: "#121212", // Dark mode background color
        paper: "#1E1E1E", // Dark mode paper color (for cards, etc.)
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Set your desired border radius
          padding: "5px 20px", // Set your desired padding
          fontWeight: "bold", // Set your desired font weight
        },
      },
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            backgroundColor: orange[500], // Set your desired background color
          },
        },
        {
          props: { variant: "outlined", color: "secondary" },
          style: {
            borderColor: green[500], // Set your desired border color
          },
        },
      ],
    },
  },
});
