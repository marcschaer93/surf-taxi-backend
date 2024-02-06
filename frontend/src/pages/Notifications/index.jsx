import React from "react";
import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

export const Notifications = ({ notifications }) => {
  return (
    <>
      <Typography variant="h5">Notifications</Typography>
      <Box>
        {notifications.length > 0 && (
          <Box>
            {notifications.map((notification) => (
              <Link to={`/trips/${notification.tripId}`} key={notification.id}>
                <Box>
                  {/* Render notification content here */}
                  <Typography>{notification.message}</Typography>
                </Box>
              </Link>
            ))}
            <p>Unread Notifications: {notifications.length}</p>
          </Box>
        )}
      </Box>
    </>
  );
};
