import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import * as Api from "../api/auth";
import { useLocalStorage } from "./useLocalStorage";

export const useAuth = () => {
  // Storing user data in localStorage keeps the user logged in even after a page reload. It's convenient but can be less secure compared to storing data only in state.
  const [user, setUser] = useLocalStorage("user", null);

  const login = async (credentials) => {
    try {
      const loginResponse = await Api.loginUser(credentials);
      const { accessToken, refreshToken, user } = loginResponse;

      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);
      console.log("Current_User:", user);

      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);

      if (user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const register = async (data) => {
    try {
      const registerResponse = await Api.registerUser(data);

      const { accessToken, refreshToken, user } = registerResponse;
      console.log("Current_User:", user);

      console.log({ accessToken });

      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);

      if (user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        return user;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    console.log("Current_User", user);
    checkTokenExpiration(); // Ensure it runs when the user state changes
  }, [user]);

  const checkTokenExpiration = () => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      // Decode the token to extract the expiration time
      const decodedToken = jwtDecode(accessToken);
      const expirationTime = decodedToken.exp;

      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

      if (currentTime >= expirationTime) {
        // Token has expired, set user to null and redirect to login
        logout();
      }
    }
  };

  // This sets up an interval that checks the token expiration every 60 seconds (you can adjust the time as needed). The interval is cleared when the component unmounts to prevent memory leaks. Adjust the timing based on how frequently you want to check the token expiration.
  useEffect(() => {
    const intervalId = setInterval(() => {
      checkTokenExpiration();
    }, 600000); // Check every 10 minutes (adjust the time interval as needed)

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return { user, login, register, logout };
};
