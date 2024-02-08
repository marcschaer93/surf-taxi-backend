import React from "react";
import { Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Title, TitleDivider } from "../../styles/fontStyles";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { theme } from "../../utils/theme";

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
      <Box>
        {/* <NotificationButton notifications={notifications} /> */}
        <Title variant="h3">Notifications</Title>
        <TitleDivider />
      </Box>

      {notifications.length > 0 ? (
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
      ) : (
        <Box sx={{ textAlign: "center", mt: "80px", p: "25px" }}>
          <NotificationsOutlinedIcon
            sx={{ fontSize: "3rem", color: theme.palette.text.secondary }}
          />
          <Typography variant="h6">No notifications yet</Typography>
          <Typography color="text.secondary">
            We will let you know when trip updates arrive!
          </Typography>
        </Box>
      )}
    </>
  );
};
