import React, { useEffect, useState } from "react";
import * as UserApi from "../api/services/UserApi";
import { useAuthContext } from "../context/authProvider";
import { Box, Typography } from "@mui/material";

export const NotificationChecker = () => {
  const { user } = useAuthContext();
  const [notifications, setNotifications] = useState([]);
  console.log("NOTIFICATIONS", notifications);

  const checkNotifications = async () => {
    try {
      const unreadNotifications = await UserApi.checkNotifications(
        user.username
      );
      setNotifications(unreadNotifications);
    } catch (error) {
      console.error("Error checking notifications:", error);
    }
  };

  useEffect(() => {
    // Initial check when component mounts
    checkNotifications();

    // Set up periodic checks (adjust interval based on your needs)
    const intervalId = setInterval(checkNotifications, 1 * 60 * 1000); // 4 times a day

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, [user.username]);

  return { notifications, loading, checkNotifications };
};
