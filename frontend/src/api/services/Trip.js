import { apiService } from "../apiConfig";

export const createTrip = async (tripData) => {
  try {
    const response = await apiService.post("/trips/create", tripData);
    console.log("response", response);

    if (response.status === 201) {
      const { newTrip } = response.data;
      return newTrip;
    } else {
      throw new Error("Failed to create trip");
    }
  } catch (error) {
    console.error(error);
  }
};

export const allTrips = async () => {
  try {
    const response = await apiService.get("/trips");
    console.log("response", response);

    if (response.status === 201) {
      const { trips } = response.data;
      return trips;
    } else {
      throw new Error("Failed to get all trips");
    }
  } catch (error) {
    console.error(error);
  }
};
