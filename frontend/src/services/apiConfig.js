// API configuration

import axios from "axios";

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

// Add a request interceptor. On every request, it adds accessToken to headers
apiService.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor. Check every Response. If token expires, generates new.
apiService.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        const refreshTokenResponse = await apiService.post(
          "/auth/refresh-token",
          {
            refreshToken,
          }
        );
        const { accessToken } = refreshTokenResponse.data;
        localStorage.setItem("access_token", accessToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiService(originalRequest);
      } catch (error) {
        console.error("Token refresh failed:", error);
        // Handle refresh token error or redirect to login
      }
    }

    return Promise.reject(error);
  }
);
