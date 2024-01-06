import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const jwt = require("jsonwebtoken");

// Your backend API base URL (localhost for dev)
const BASE_URL =
  import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:3000";

// Create an instance of axios with custom configurations (apiService)
const apiService = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// API Helper Functions
// *********************************************************************************************
// *********************************************************************************************

// Set the token in the headers for every request
// const setAuthToken = (token) => {
//   if (token) {
//     apiService.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   } else {
//     delete apiService.defaults.headers.common["Authorization"];
//   }
// };

// Function to set access token in cookies
const setAccessToken = (token) => {
  // const accessToken = cookies.access_token;
  const accessToken = cookies.get("access_token");

  if (accessToken) {
    // Remove the access token cookie
    cookies.remove("access_token", {
      path: "/",
      httpOnly: true,
      secure: true, // Set to true if using HTTPS
    });
  }

  cookies.set("access_token", token, {
    path: "/",
    httpOnly: true,
    secure: true, // Set to true if using HTTPS
  });
};

// Function to set refresh token in localStorage
const setRefreshToken = (token) => {
  const refreshToken = localStorage.get("refresh_token");

  if (refreshToken) {
    // Remove the refresh token from localStorage
    localStorage.removeItem("refresh_token");
  }

  localStorage.setItem("refresh_token", token);
};

// API methods
// *********************************************************************************************
// *********************************************************************************************

export const loginUser = async (username, password) => {
  try {
    const response = await apiService.post("/auth/token", {
      username,
      password,
    });

    if (response.status === 200) {
      const { accessToken, refreshToken } = response.data;
      setRefreshToken(refreshToken);
      setAccessToken(accessToken);
    }

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const logoutUser = async () => {
  try {
    // Remove the access token cookie
    cookies.remove("access_token", {
      path: "/",
      httpOnly: true,
      secure: true, // Set to true if using HTTPS
    });

    // Remove the refresh token from localStorage
    localStorage.removeItem("refresh_token");

    return { success: true, message: "User logged out successfully" };
  } catch (error) {
    throw new Error("Error logging out: " + error.message);
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await apiService.post("/auth/register", userData);

    if (response.status === 200) {
      const { accessToken, refreshToken } = response.data;
      setRefreshToken(refreshToken);
      setAccessToken(accessToken);
    }

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const fetchUserData = async () => {
  try {
    const response = await apiService.get("/user");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const createTrip = async (tripData) => {
  try {
    const response = await apiService.post("/trips/create", tripData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const allTrips = async () => {
  try {
    const response = await apiService.get("/trips");
    return response.data.trips;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// ***************************************************************************************************
// ***************************************************************************************************
// INTERCEPTORS
// Axios interceptor for handling token expiration

// Add a response interceptor
apiService.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post("/auth/refresh-token", {
          refreshToken,
        });
        const { accessToken } = response.data;

        setAccessToken(accessToken);

        // Retry the original request with the new token
        return axios(originalRequest);
      } catch (error) {
        // Handle refresh token error or redirect to login
      }
    }

    return Promise.reject(error);
  }
);
