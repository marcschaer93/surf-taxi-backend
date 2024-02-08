import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import * as AuthApi from "../api/services/AuthApi";
import { useLocalStorage } from "./useLocalStorage";

export const useAuth = () => {
  // Storing user data in localStorage keeps the user logged in even after a page reload. It's convenient but can be less secure compared to storing data only in state.
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const updateUser = (newUserData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...newUserData,
    }));
  };

  const handleLogin = async (credentials) => {
    try {
      const loginResponse = await AuthApi.loginUser(credentials);
      const { accessToken, refreshToken, loggedInUser } = loginResponse;

      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);

      if (loggedInUser) {
        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(user));
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error(`Invalid userame or password`);
      } else {
        toast.error("Login failed. Please try again.");
      }
      console.error(error);
    }
  };

  const handleRegister = async (data) => {
    try {
      const registerResponse = await AuthApi.registerUser(data);
      const { accessToken, refreshToken, user } = registerResponse;

      if (user) {
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        console.log("Logged in User:", user);
        return user;
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.error.message;
        if (errorMessage.includes("Duplicate username")) {
          // Handle duplicate username error
          throw new Error(`Username is taken. Log in or choose another.`);
        }
      }
      console.error(error);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    // console.log("Logged in User:", user);
    // checkTokenExpiration(); // Ensure it runs when the user state changes
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

  return { user, handleLogin, handleRegister, handleLogout, updateUser };
};
