// API configuration

import axios from "axios";
import { setRefreshToken, setAccessToken } from "./tokenService";

// Your backend API base URL (localhost for dev)
const BASE_URL =
  import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:3000";

// Create an instance of axios with custom configurations (apiService)
export const apiService = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// INTERCEPTORS

// Axios response interceptor for handling token expiration
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
        const response = await apiService.post("/auth/refresh-token", {
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
