import { apiService } from "../apiConfig";

export const createTrip = async (tripData) => {
  try {
    const response = await apiService.post("/trips", tripData);
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

    if (response.status === 200) {
      const { trips } = response.data;
      return trips;
    } else {
      throw new Error("Failed to get all trips");
    }
  } catch (error) {
    console.error(error);
  }
};

export const tripDetail = async (id) => {
  try {
    const parsedId = parseInt(id, 10);
    const response = await apiService.get(`/trips/${parsedId}`);

    if (response.status === 200) {
      const { tripDetail } = response.data;
      return tripDetail;
    } else {
      throw new Error("Failed to get trip details");
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateTrip = async (id) => {
  try {
    const response = await apiService.patch(`/trips/${id}`);
    console.log("response", response);

    if (response.status === 200) {
      const { updatedTrip } = response.data;
      return updatedTrip;
    } else {
      throw new Error("Failed to update trip");
    }
  } catch (error) {
    console.error(error);
  }
};
