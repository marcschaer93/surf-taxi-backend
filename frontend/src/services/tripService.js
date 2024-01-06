import { apiService } from "./apiConfig";

export const createTrip = async (tripData) => {
  try {
    const response = await apiService.post("/trips/create", tripData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const allTrips = async () => {
  try {
    const response = await apiService.get("/trips");
    return response.data.trips;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
