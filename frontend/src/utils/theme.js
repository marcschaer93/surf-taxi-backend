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
    fontFamily: "Inter, sans-serif",
    fontSize: 14,
    h1: {
      fontSize: "2.5rem", // Adjust heading sizes as needed
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.5,
    },
    button: {
      fontSize: "1rem",
      fontWeight: 600,
      textTransform: "none", // Prevent button text from being capitalized
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
    },
    overline: {
      fontSize: "0.625rem",
      fontWeight: 400,
      textTransform: "uppercase",
    },
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
          borderRadius: 4, // Set your desired border radius
          padding: "5px 20px", // Set your desired padding
          fontWeight: "bold", // Set your desired font weight
        },
      },
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            backgroundColor: "#252530", // Set your desired background color
          },
        },
        {
          props: { variant: "contained", color: "secondary" },
          style: {
            backgroundColor: "#d41b64", // Set your desired background color
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
