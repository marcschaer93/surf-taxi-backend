import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { useTheme } from "@mui/material";
import React, { useContext } from "react";

import { useAuthContext } from "../context/authProvider";

// import { CurrentUserContext } from "../utils/UserContext";
import { navLinkStyle } from "../styles/navbarStyles";

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
  //   const { currentUser, logoutUser } = useAuthContext();
  const { handleLogin, handleLogout, user } = useAuthContext();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button component={NavLink} to="/" size="large" color="inherit">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              SURF TAXI
            </Typography>
          </Button>

          <Box sx={{ display: "flex", gap: "20px" }}>
            <Button
              component={NavLink}
              to="/trips"
              size="large"
              color="inherit"
              sx={navLinkStyle}
            >
              Trips
            </Button>
            <Button
              component={NavLink}
              to="/jobs"
              size="large"
              color="inherit"
              sx={navLinkStyle}
            >
              Jobs
            </Button>
            {user ? (
              <Button
                component={NavLink}
                to="/profile"
                size="large"
                color="inherit"
                sx={navLinkStyle}
              >
                Profile
              </Button>
            ) : (
              ""
            )}

            {user ? (
              <Button
                onClick={() => handleLogout()}
                to="/"
                component={NavLink}
                size="large"
                color="inherit"
                sx={navLinkStyle}
              >
                {`Logout ${user.username}`}
              </Button>
            ) : (
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
        </Toolbar>
      </AppBar>
    </Box>
  );
};
