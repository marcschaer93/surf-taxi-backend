// Function to extract expiration time from the access token
const extractAccessTokenExp = (accessToken) => {
  try {
    const decoded = jwt.decode(accessToken);
    if (decoded && decoded.exp) {
      // 'exp' contains the expiration time as a Unix timestamp
      return decoded.exp * 1000; // Convert to milliseconds
    }
    return null;
  } catch (error) {
    console.error("Error decoding access token:", error);
    return null;
  }
};

apiService.interceptors.response.use(
  // Function to handle successful responses
  (response) => {
    return response;
  },
  // Function to handle errors in responses
  async (error) => {
    const originalRequest = error.config;

    // Check if the response status is 401 (Unauthorized) and if retry hasn't been attempted yet
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Get the refresh token from localStorage
      const refreshToken = localStorage.getItem("refreshToken");

      // Get the access token from cookies
      const accessToken = cookies.get("access_token");

      // Extract expiration time from the access token
      const accessTokenExp = extractAccessTokenExp(accessToken);
      console.log("Access token expiration:", new Date(accessTokenExp));

      // Calculate the time remaining until the access token expires
      const timeUntilExpiration = accessTokenExp - Date.now();

      // Set a threshold (e.g., 5 minutes in milliseconds) for refreshing the token before it expires
      const refreshThreshold = 5 * 60 * 1000; // 5 minutes in milliseconds

      // Check if the remaining time until expiration is less than the refresh threshold
      if (timeUntilExpiration < refreshThreshold) {
        // Send a request to the server to refresh the access token using the refresh token
        const newTokenResponse = await apiService.post("/auth/refresh-token", {
          refreshToken,
        });

        // If the token refresh request is successful (status code 200)
        if (newTokenResponse.status === 200) {
          const { accessToken } = newTokenResponse.data;
          setAccessToken(accessToken);

          // Retry the original request with the new access token
          return apiService(originalRequest);
        }
      }
    }
    // Reject the error if the conditions are not met for refreshing the token
    return Promise.reject(error);
  }
);
