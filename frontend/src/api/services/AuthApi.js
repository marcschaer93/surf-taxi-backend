import { ApiService } from "../apiConfig";
import { handleApiError } from "../apiErrorHandler";

// provides functions for authentication

export const registerUser = async (userData) => {
  try {
    const response = await ApiService.post("/auth/register", userData);
    return response.data.data;
  } catch (error) {
    handleApiError(error);
    throw error;
    // return null; // or throw error if needed
    // Optionally rethrow or return a specific value based on your needs
  }
};

export const loginUser = async ({ username, password }) => {
  try {
    const response = await ApiService.post("/auth/login", {
      username,
      password,
    });
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    handleApiError(error);
    throw error;
    // return null; // or throw error if needed
    // Optionally rethrow or return a specific value based on your needs
  }
};
