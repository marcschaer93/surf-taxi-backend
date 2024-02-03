// const cardStyles = {
//   card: {
//     width: "70vW",
//     border: "solid #CCCCCC 1px",
//     boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
//     borderRadius: "8px",
//     backgroundColor: "#FFFFFF",
//   },
//   cardSmall: {
//     width: "50vW",
//     border: "solid #CCCCCC 1px",
//     boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
//     borderRadius: "8px",
//     backgroundColor: "#FFFFFF",
//   },
//   cardAnimated: {
//     width: "70vW",
//     border: "solid #CCCCCC 1px",
//     boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
//     borderRadius: "8px",
//     backgroundColor: "#FFFFFF",
//     cursor: "pointer",
//     transition: "transform 0.2s",
//     "&:hover": {
//       transform: "scale(1.05)",
//     },
//     "&:active": {
//       transform: "scale(0.98)",
//     },
//   },
//   cardContainer: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     width: "100%",
//   },
//   cardContent: {
//     padding: "30px",
//   },
// };

// // export default cardStyles;

// export const { card, cardAnimated, cardContainer, cardContent, cardSmall } =
//   cardStyles;

import { styled } from "@mui/material";

import { Box, Card, Button, Typography } from "@mui/material";
import { theme } from "../utils/theme";

export const StyledPreviewCard = styled(Card)(({ theme }) => ({
  position: "relative",
  borderWidth: "1px", // Increase border width for a more prominent look
  borderRadius: theme.shape.borderRadius, // Use the theme's border radius for consistency
  overflow: "hidden", // Hide overflow for better aesthetics
  cursor: "pointer",
  transition: "background 0.3s ease, transform 0.3s ease",
  margin: "20px 0", // Add margin to create space between cards
  width: "100%",
  "&:hover": {
    background: theme.palette.action.hover,
    transform: "scale(1.02)", // Scale the card slightly on hover for a subtle effect
    boxShadow: `0 5px 15px rgba(0, 0, 0, 0.2)`, // Add a shadow on hover
  },
  "&:active": {
    transform: "scale(0.98)", // Shrink the card slightly on click
  },
}));

export const StyledDetailsCard = styled(Card)(({ theme }) => ({
  position: "relative",
  borderWidth: "1px", // Increase border width for a more prominent look
  borderRadius: theme.shape.borderRadius, // Use the theme's border radius for consistency
  overflow: "hidden", // Hide overflow for better aesthetics
  cursor: "pointer",
  transition: "background 0.3s ease, transform 0.3s ease",
  margin: "20px 0", // Add margin to create space between cards
  width: "100%",
  "&:hover": {
    background: theme.palette.action.hover,
    transform: "scale(1.02)", // Scale the card slightly on hover for a subtle effect
    boxShadow: `0 5px 15px rgba(0, 0, 0, 0.2)`, // Add a shadow on hover
  },
  "&:active": {
    transform: "scale(0.98)", // Shrink the card slightly on click
  },
}));
