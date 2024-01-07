import { loginUser } from ".././services/authService";
import { useLocalStorage } from "./useLocalStorage";

export const useAuth = () => {
  const [user, setUser] = useLocalStorage("user", null);

  const login = async (credentials) => {
    try {
      const { accessToken, refreshToken, user } = await loginUser(credentials);

      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);
      console.log("User:", user);

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

  const register = async (data) => {
    try {
      const newUserData = await Api.registerUser(data);

      const { accessToken, refreshToken, user } = newUserData;
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
    setUser(null);
    localStorage.removeItem("user");
  };

  return { user, login, register, logout };
};
