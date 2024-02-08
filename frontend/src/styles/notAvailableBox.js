import { styled } from "@mui/material";
import { IconButton } from "@mui/material";

import { Box, Card, Button, Typography } from "@mui/material";
import { theme } from "../utils/theme";

export const NotAvailableBox = styled(Box)({
  borderRadius: "50%",
  border: `0.1px solid ${theme.palette.text.secondary}`,
  padding: "5px", // Adjust padding as needed
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: "white",
    color: theme.palette.primary.contrastText,
  },
  "& .MuiSvgIcon-root": {
    fontSize: "1.1rem", // Adjust the size as needed
  },

  position: "absolute",
  top: 18,
  right: 18,
  fontSize: "8px",
  fontWeight: "bold",
});
