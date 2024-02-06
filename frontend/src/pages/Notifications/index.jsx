import React from "react";
import { Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export const Notifications = ({ notifications, markNotificationAsRead }) => {
  const navigate = useNavigate();

  const handleOnLinkClick = (e, notification) => {
    e.preventDefault();
    console.log(notification);
    markNotificationAsRead(notification.id);
    navigate(`/trips/${notification.tripId}`);
  };

  return (
    <>
      <Typography variant="h5">Notifications</Typography>
      <Box>
        {notifications.length > 0 && (
          <Box>
            {notifications.map((notification) => (
              <Link
                onClick={(e) => handleOnLinkClick(e, notification)}
                key={notification.id}
              >
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
