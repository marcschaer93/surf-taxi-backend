import { styled } from "@mui/material";

import { Box, Card, Button, Typography } from "@mui/material";
import { theme } from "../utils/theme";

export const StyledPreviewCard = styled(Card)(({ theme }) => ({
  position: "relative",
  borderWidth: "0.5px", // Increase border width for a more prominent look
  borderRadius: "8px", // Use the theme's border radius for consistency
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
  borderWidth: "0.5px", // Increase border width for a more prominent look
  borderRadius: "8px", // Use the theme's border radius for consistency
  borderColor: theme.palette.grey[800],
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
