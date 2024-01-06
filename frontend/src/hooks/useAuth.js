import * as Api from "../services/authService";
import { useLocalStorage } from "./useLocalStorage";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const useAuth = () => {
  const [user, setUser] = useLocalStorage("user", null);

  const login = async (username, password) => {
    try {
      const userData = await Api.loginUser(username, password);

      const { accessToken, refreshToken, user } = userData;
      console.log("user", user);
      console.log({ accessToken });

      cookies.set("access_token", accessToken, {
        path: "/",
        httpOnly: true,
        secure: true, // Set to true if using HTTPS
      });

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

  const register = async (data) => {
    try {
      const newUserData = await Api.registerUser(data);

      const { accessToken, refreshToken, user } = newUserData;
      console.log("user", user);
      console.log({ accessToken });

      cookies.set("access_token", accessToken, {
        path: "/",
        httpOnly: true,
        secure: true, // Set to true if using HTTPS
      });

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
    cookies.remove("access_token", {
      path: "/",
      httpOnly: true,
      secure: true, // Set to true if using HTTPS
    });

    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("refresh_token");
  };

  return { user, login, register, logout };
};
