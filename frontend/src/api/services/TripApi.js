import { ApiService, handleApiError } from "../apiConfig";

export const createNewTrip = async (tripData) => {
  try {
    const response = await ApiService.post("/trips", tripData);
    return response.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getAllTrips = async () => {
  try {
    const response = await ApiService.get("/trips");
    return response.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getOneTrip = async (tripId) => {
  try {
    const response = await ApiService.get(`/trips/${tripId}`);
    return response.data.data;
  } catch (error) {
    handleApiError(error);
    return null;
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
