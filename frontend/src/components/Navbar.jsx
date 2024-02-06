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
import TuneSharpIcon from "@mui/icons-material/TuneSharp";

import { useAuthContext } from "../context/authProvider";
import { navLinkStyle } from "../styles/navbarStyles";
import { SearchBar } from "./ui/SearchBar";
import { Popover } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { theme } from "../utils/theme";

/**
 * Navbar Component
 *
 * Renders a navigation bar with links based on user authentication status.
 * Utilizes NavLink for routing and CurrentUserContext for user-related data.
 *
 * @returns {JSX.Element} - A navigation bar component with dynamic links based on user authentication.
 */

export const Navbar = () => {
  const { handleLogin, handleLogout, user } = useAuthContext();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const NotificationContainer = styled(Box)(({ theme }) => ({
    display: "none",
    alignItems: "center",
    gap: "20px",
    [theme.breakpoints.up("sm")]: { display: "flex" },
  }));

  const logout = () => {
    handleLogout();
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Button
              sx={{ display: { xs: "none", sm: "block" } }}
              component={NavLink}
              to="/"
              size="large"
              color="inherit"
            >
              <SurfingIcon />
              Surf taxi
            </Button>
          </Box>

          <SearchBar />

          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: "20px" }}>
            {user && (
              <>
                <Button
                  component={NavLink}
                  to="/my-trips"
                  size="large"
                  color="inherit"
                  sx={navLinkStyle}
                >
                  MyTrips
                </Button>
                <Button
                  component={NavLink}
                  to="/favorites"
                  size="large"
                  color="inherit"
                  sx={navLinkStyle}
                >
                  Favorites
                </Button>
              </>
            )}
          </Box>
          <Box>
            {!user && (
              <Button
                component={NavLink}
                to="/login"
                size="medium"
                color="secondary"
                sx={navLinkStyle}
              >
                Login
              </Button>
            )}
          </Box>

          {user && (
            <NotificationContainer>
              <Badge badgeContent={4} color="secondary">
                <Mail color="" />
              </Badge>
              <Badge badgeContent={2} color="secondary">
                <Notifications color="" />
              </Badge>
            </NotificationContainer>
          )}

          {user && (
            <Box sx={{ display: { xs: "flex", sm: "none" } }}>
              <IconButton
                onClick={() => console.log("SETTINGS, NOT IMPLEMENTED")}
                color="inherit"
              >
                <TuneSharpIcon />
              </IconButton>
            </Box>
          )}

          {user && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    sx={{
                      display: { xs: "none", sm: "flex" },
                      width: { xs: 24, sm: 32 },
                      height: { xs: 24, sm: 32 },
                    }}
                    alt="Marc Schär"
                    src="../src/assets/images/avatar.jpg"
                    // src={user.profileImgUrl}
                  />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem component={Link} to="/profile">
                  Profile
                </MenuItem>
                <MenuItem>My account</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>

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
