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

import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";

export const BottomNavBar = ({ notifications }) => {
  const { user } = useAuthContext();
  const [value, setValue] = useState(0);

  const profileIcon =
    notifications.length > 0 ? (
      <Badge badgeContent={notifications.length} color="error">
        <AccountCircleOutlinedIcon />
      </Badge>
    ) : (
      <AccountCircleOutlinedIcon />
    );

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000, // Adjust z-index as neededs
      }}
    >
      {user ? (
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            component={NavLink}
            to="/trips"
            label="Explore"
            icon={<SearchIcon />}
          />
          <BottomNavigationAction
            component={NavLink}
            to="/favorites"
            label="Favorites"
            icon={<FavoriteBorderSharpIcon />}
          />
          <BottomNavigationAction
            component={NavLink}
            to="/new-trip"
            label="Add Trip"
            icon={<AddCircleOutlineSharpIcon />}
          />
          <BottomNavigationAction
            label="My Trips"
            component={NavLink}
            to="/my-trips"
            icon={<SurfingSharpIcon />}
          />
          <BottomNavigationAction
            component={NavLink}
            to="/profile"
            label="Profile"
            icon={profileIcon}
          />
        </BottomNavigation>
      ) : (
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            component={NavLink}
            to="/trips"
            label="Explore"
            icon={<RestoreIcon />}
          />

          <BottomNavigationAction
            component={NavLink}
            to="/login"
            label="Login"
            icon={<AccountCircleOutlinedIcon />}
          />
        </BottomNavigation>
      )}
    </Paper>
  );
};
