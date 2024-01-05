import axios from "axios";

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

// Set the token in the headers for every request
const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

// API methods

export const loginUser = async (username, password) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
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
