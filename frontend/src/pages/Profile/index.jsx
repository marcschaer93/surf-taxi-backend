import React from "react";
import { Link } from "react-router-dom";
import { EditProfile } from "./EditProfile";
import { IconButton, Badge, Box, Typography, Button } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

export const Profile = () => {
  return (
    <>
      <Typography variant="h5">Profile</Typography>
      <Box sx={{ position: "relative" }}>
        <Link to="/profile-edit">
          <Button size="small" variant="outlined">
            Edit Profile
          </Button>
        </Link>
        <Box component={Link} to="/notifications">
          {/* Replace the following onClick handler with your actual logic */}
          <IconButton
            color="inherit"
            sx={{ position: "absolute", top: 0, right: 0 }}
          >
            <Badge badgeContent={3} color="error">
              <NotificationsOutlinedIcon />
            </Badge>
          </IconButton>
        </Box>
      </Box>
    </>
  );
};
