import { apiService } from "../api/apiConfig";

export const fetchUserData = async () => {
  try {
    const response = await apiService.get("/user");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
