import { ApiService } from "../apiConfig";
import { handleApiError } from "../apiErrorHandler";

export const createNewReservation = async (tripId) => {
  try {
    const response = await ApiService.post(`/reservations/${tripId}`);
    return response.data.data;
  } catch (error) {
    handleApiError();
    throw error;
  }
};

export const deleteOneReservation = async (tripId) => {
  try {
    const response = await ApiService.delete(`/reservations/${tripId}`);
    return response.data.data;
  } catch (error) {
    handleApiError();
    throw error;
  }
};

export const updateOneReservation = async (
  tripId,
  reservationUsername,
  newStatus
) => {
  try {
    const response = await ApiService.patch(`/reservations/${tripId}`, {
      newStatus,
      reservationUsername,
    });
    console.log("RESPONSE", response.data.data);
    return response.data.data;
  } catch (error) {
    handleApiError();
    throw error;
  }
};

export const getAllTripReservations = async (tripId) => {
  try {
    const response = await ApiService.get(`/reservations/${tripId}`);
    return response.data.data;
  } catch (error) {
    handleApiError();
    throw error;
  }
};
