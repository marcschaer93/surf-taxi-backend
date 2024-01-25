import { ApiService, handleApiError } from "../apiConfig";

export const getOneUser = async () => {
  try {
    const response = await ApiService.get("/user");
    return response.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateUserProfile = async (username, updateData) => {
  try {
    const response = await ApiService.patch(`/users/${username}`, updateData);
    console.log("response", response);
    return response.data.data;
  } catch (error) {
    handleApiError(error);
  }
};
