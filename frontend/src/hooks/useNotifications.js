import React, { useEffect, useState } from "react";
import * as UserApi from "../api/services/UserApi";
import { useAuthContext } from "../context/authProvider";
import { Box, Typography } from "@mui/material";

export const useNotifications = (user) => {
  const [notifications, setNotifications] = useState([]);

  const checkNotifications = async () => {
    try {
      if (user) {
        const unreadNotifications = await UserApi.checkNotifications(
          user.username
        );
        setNotifications(unreadNotifications);
      }
    } catch (error) {
      console.error("Error checking notifications:", error);
    }
  };

  const markNotificationAsRead = async (notificationId) => {
    try {
      await UserApi.markNotificationAsRead(user.username, notificationId);
      // Update notifications state after marking notification as read
      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification.id !== notificationId
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  useEffect(() => {
    // Initial check when component mounts
    checkNotifications();

    // Set up periodic checks (adjust interval based on your needs)
    const intervalId = setInterval(checkNotifications, 1 * 60 * 60 * 1000); // 4 times a day

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, [user]);

  return { notifications, checkNotifications, markNotificationAsRead };
};
