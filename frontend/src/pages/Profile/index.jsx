import React from "react";
import { Link } from "react-router-dom";
import { EditProfile } from "./EditProfile";
import { IconButton, Badge, Box, Typography, Button } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { useNotifications } from "../../hooks/useNotifications";
import { useAuthContext } from "../../context/authProvider";

export const Profile = ({ notifications }) => {
  // const { user } = useAuthContext();
  // const { notifications } = useNotifications(user);
  // console.log("NOTIFICATION", notifications);
  const { handleLogout } = useAuthContext();
  return (
    <>
      <Typography variant="h5">Profile</Typography>
      <Box sx={{ position: "relative" }}>
        <Link to="/profile-edit">
          <Button size="small" variant="outlined">
            Edit Profile
          </Button>
          <Button onClick={handleLogout} size="small" variant="outlined">
            Logout
          </Button>
        </Link>
        <Link to="/notifications">
          {/* Replace the following onClick handler with your actual logic */}
          <IconButton
            color="inherit"
            sx={{ position: "absolute", top: 0, right: 0 }}
          >
            <Badge badgeContent={notifications.length} color="error">
              <NotificationsOutlinedIcon />
            </Badge>
          </IconButton>
        </Link>
      </Box>
    </>
  );
};
