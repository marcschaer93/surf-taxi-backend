import Cookies from "universal-cookie";

const cookies = new Cookies();

// Function to set access token in cookies
export const setAccessToken = (token) => {
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
export const setRefreshToken = (token) => {
  const refreshToken = localStorage.get("refresh_token");

  if (refreshToken) {
    // Remove the refresh token from localStorage
    localStorage.removeItem("refresh_token");
  }

  localStorage.setItem("refresh_token", token);
};
