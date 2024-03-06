import Paper from "@mui/material/Paper";
import { useState } from "react";
import { Button } from "@mui/material";

import { useAuthContext } from "../context/authProvider";
import { theme } from "../utils/theme";

export const BottomActionBar = ({ variant, color, onClick, buttonText }) => {
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000, // Adjust z-index as needed
        height: "80px",
        backgroundColor: theme.palette.grey[300],
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Add more shadow
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        sx={{
          width: "90%",
          borderRadius: "50px",
          height: "2.5rem",
          marginBottom: "5px",
        }}
        variant={variant}
        color={color}
        type="submit"
        size="medium"
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </Paper>
  );
};
