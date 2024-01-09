import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// import { loginUser } from "../services/authService";
import * as Api from "../services/authService";
import { useLocalStorage } from "./useLocalStorage";

export const useAuth = () => {
  const [user, setUser] = useLocalStorage("user", null);

  const login = async (credentials) => {
    try {
      const loginResponse = await Api.loginUser(credentials);
      const { accessToken, refreshToken, user } = loginResponse;

      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);
      console.log("User:", user);

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
      console.log("user", user);
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

  // Call the expiration check function when the hook is initialized or when a user action occurs
  useEffect(() => {
    checkTokenExpiration();
  }, []);

  return { user, login, register, logout };
};
