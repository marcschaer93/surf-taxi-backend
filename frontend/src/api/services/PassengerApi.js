import { ApiService } from "../apiConfig";
import { handleApiError } from "../apiErrorHandler";

// const newJoinRequest = await PassengerApi.requestToJoin(tripId, currentUser);

export const requestToJoin = async (tripId) => {
  try {
    const response = await ApiService.post(`passengers/trips/${tripId}/join`);
    return response.data.data;
  } catch (error) {
    handleApiError();
    throw error;
  }
};
