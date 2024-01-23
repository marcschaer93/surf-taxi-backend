import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { useTheme } from "@mui/material";
import React, { useContext } from "react";
import { Badge } from "@mui/material";
import Mail from "@mui/icons-material/Mail";
import Notifications from "@mui/icons-material/Notifications";
import { useState } from "react";
import { Link } from "react-router-dom";

import SurfingIcon from "@mui/icons-material/Surfing";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { useAuthContext } from "../context/authProvider";
import { navLinkStyle } from "../styles/navbarStyles";
import { SearchBar } from "./ui/SearchBar";

/**
 * Navbar Component
 *
 * Renders a navigation bar with links based on user authentication status.
 * Utilizes NavLink for routing and CurrentUserContext for user-related data.
 *
 * @returns {JSX.Element} - A navigation bar component with dynamic links based on user authentication.
 */

export const Navbar = () => {
  //   const theme = useTheme();
  const { handleLogin, handleLogout, user } = useAuthContext();
  const [open, setOpen] = useState(false);

  const Icons = styled(Box)(({ theme }) => ({
    display: "none",
    alignItems: "center",
    gap: "20px",
    [theme.breakpoints.up("sm")]: { display: "flex" },
  }));

  const UserBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    [theme.breakpoints.up("sm")]: { display: "none" },
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button component={NavLink} to="/" size="large" color="inherit">
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              SURF TAXI
            </Typography>
            <SurfingIcon sx={{ display: { sx: "block", sm: "none" } }} />
          </Button>
          <SearchBar />

          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: "20px" }}>
            {user && (
              <Button
                component={NavLink}
                to="/my-trips"
                size="large"
                color="inherit"
                sx={navLinkStyle}
              >
                MyTrips
              </Button>
            )}

            {!user && (
              <Button
                component={NavLink}
                to="/login"
                size="large"
                color="inherit"
                sx={navLinkStyle}
              >
                Login
              </Button>
            )}
          </Box>
          {user && (
            <Icons>
              <Badge badgeContent={4} color="secondary">
                <Mail color="" />
              </Badge>
              <Badge badgeContent={2} color="secondary">
                <Notifications color="" />
              </Badge>
              <Avatar
                alt="Marc Schär"
                src="../src/assets/images/avatar.jpg"
                onClick={(e) => setOpen(true)}
              />
            </Icons>
          )}

          <UserBox onClick={(e) => setOpen(true)}>
            <Avatar alt="Marc Schär" src="../src/assets/images/avatar.jpg" />
            <Typography variant="span">Marc</Typography>
          </UserBox>
        </Toolbar>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          open={open}
          onClose={(e) => setOpen(false)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem component={Link} to="/profile">
            Profile
          </MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuItem onClick={(e) => handleLogout()}>Logout</MenuItem>
        </Menu>

        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
      </AppBar>
    </Box>
  );
};
