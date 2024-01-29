import { ApiService } from "../apiConfig";
import { handleApiError } from "../apiErrorHandler";

export const createNewTrip = async (tripData) => {
  try {
    const response = await ApiService.post("/trips", tripData);
    return response.data.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const getAllTrips = async () => {
  try {
    const response = await ApiService.get("/trips");
    return response.data.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const getOneTrip = async (tripId) => {
  try {
    const response = await ApiService.get(`/trips/${tripId}`);
    return response.data.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const updateOneTrip = async (tripId) => {
  try {
    const response = await ApiService.patch(`/trips/${tripId}`);
    return response.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteOneTrip = async (tripId) => {
  try {
    const response = await ApiService.delete(`/trips/${tripId}`);
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
