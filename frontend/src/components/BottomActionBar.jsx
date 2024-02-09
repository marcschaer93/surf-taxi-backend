import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Paper from "@mui/material/Paper";
import { RequireAuth } from "./RequireAuth";
import { useAuthContext } from "../context/authProvider";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import SurfingSharpIcon from "@mui/icons-material/SurfingSharp";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import { SubmitButton } from "../styles/formStyles";
import { theme } from "../utils/theme";

export const BottomActionBar = ({ variant, color, onClick, buttonText }) => {
  const { user } = useAuthContext();
  const [value, setValue] = useState(0);

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
