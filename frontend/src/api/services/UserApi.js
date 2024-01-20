import { ApiService, handleApiError } from "../apiConfig";

export const getOneUser = async () => {
  try {
    const response = await ApiService.get("/user");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
