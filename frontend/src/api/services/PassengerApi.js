import { ApiService } from "../apiConfig";
import { handleApiError } from "../apiErrorHandler";

// const newJoinRequest = await PassengerApi.requestToJoin(tripId, currentUser);

export const requestToJoin = async (tripId) => {
  try {
    const response = await ApiService.post(`/passengers/trips/${tripId}/join`);
    return response.data.data;
  } catch (error) {
    handleApiError();
    throw error;
  }
};

export const cancelJoinRequest = async (tripId) => {
  try {
    const response = await ApiService.delete(
      `/passengers/trips/${tripId}/join`
    );
    return response.data.data;
  } catch (error) {
    handleApiError();
    throw error;
  }
};

export const updatePassengerStatus = async (
  tripId,
  passengerUsername,
  newStatus
) => {
  try {
    const response = await ApiService.put(
      `/passengers/trips/${tripId}/${passengerUsername}/status`,
      { newStatus }
    );
    console.log("RESPONSE", response.data.data);
    return response.data.data;
  } catch (error) {
    handleApiError();
    throw error;
  }
};

export const getTripPassengers = async (tripId) => {
  try {
    const response = await ApiService.get(`/passengers/trips/${tripId}`);
    return response.data.data;
  } catch (error) {
    handleApiError();
    throw error;
  }
};
