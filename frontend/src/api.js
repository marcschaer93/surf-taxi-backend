import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// Your backend API base URL (localhost for dev)
const BASE_URL =
  import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:3000";

// Create an instance of axios with custom configurations
const axiosInstance = axios.create({
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
//     axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   } else {
//     delete axiosInstance.defaults.headers.common["Authorization"];
//   }
// };

// Function to set access token in cookies
const setAccessToken = (token) => {
  cookies.set("access_token", token, {
    path: "/",
    httpOnly: true,
    secure: true, // Set to true if using HTTPS
  });
};

// Function to set refresh token in localStorage
const setRefreshToken = (token) => {
  localStorage.setItem("refresh_token", token);
};

// API methods
// *********************************************************************************************
// *********************************************************************************************

export const loginUser = async (username, password) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
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
    const response = await axiosInstance.post("/auth/register", userData);

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
    const response = await axiosInstance.get("/user");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const createTrip = async (tripData) => {
  try {
    const response = await axiosInstance.post("/trips/create", tripData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const allTrips = async () => {
  try {
    const response = await axiosInstance.get("/trips");
    return response.data.trips;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
