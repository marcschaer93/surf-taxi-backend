import { ApiService } from "../apiConfig";
import { handleApiError } from "../apiErrorHandler";

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
    return response.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getAllUserTrips = async (username) => {
  try {
    const response = await ApiService.get(`/users/${username}/trips`);
    return response.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getOneUserReservation = async (username, tripId) => {
  try {
    const response = await ApiService.get(`/users/${username}/trips/${tripId}`);
    return response.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteMyTrip = async (tripId, username) => {
  try {
    const response = await ApiService.delete(
      `/users/${username}/trips/${tripId}`
    );
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const updateUserFavoriteIds = async (favoriteIds, username) => {
  try {
    const response = await ApiService.patch(`/users/${username}/favorites`, {
      favoriteIds,
    });

    console.log("RESPONSE", response);
    return response.data.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const checkNotifications = async (username) => {
  try {
    const response = await ApiService.get(
      `/users/${username}/check-notifications`
    );
    return response.data.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const markNotificationAsRead = async (username, notificationId) => {
  try {
    const response = await ApiService.patch(
      `/users/${username}/notifications/${notificationId}`
    );
    return response.data.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
