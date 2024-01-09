import { apiService } from "./apiConfig";

export const registerUser = async (userData) => {
  try {
    const response = await apiService.post("/auth/register", userData);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    // throw new Error(error.response.data.message);
  }
};

export const loginUser = async ({ username, password }) => {
  try {
    const response = await apiService.post("/auth/token", {
      username,
      password,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    console.error(error);
  }
};
