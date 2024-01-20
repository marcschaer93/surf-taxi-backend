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
    console.log("RESPONSE", response);

    // Check for success or error in the response
    if (response.data.error) {
      // Handle error case
      console.error(
        `Error (${response.data.error.code}): ${response.data.error.message}`
      );
    }

    // Handle success case
    const data = response.data.data;
    return data;
    // Process data as needed
  } catch (error) {
    // Handle any exceptions or errors that occurred during the try block
    console.error(`Unexpected error: ${error.message}`);
  }
};

// export const tripDetail = async (tripId) => {
//   try {
//     // const tripId = parseInt(id, 10);
//     console.log("tripId", tripId);
//     const response = await apiService.get(`/trips/${tripId}`);
//     console.log("RESPONSE tripDetails", response);

//     if (response.data.error) {
//       console.log("$$$");
//       console.error(
//         `Error (${response.data.error.code}): ${response.data.error.message}`
//       );
//     }
//     const data = response.data.data;
//     return data;
//   } catch (error) {
//     console.error(`Unexpected error: ${error.message}`);
//   }
// };

// export const tripDetail = async (tripId) => {
//   try {
//     const response = await apiService.get(`/trips/${tripId}`);

//     if (response.data.error) {
//       console.log("$$$");
//       console.error(
//         `Error (${response.data.error.code}): ${response.data.error.message}`
//       );
//     }

//     const data = response.data.data;
//     return data;
//   } catch (error) {
//     if (error.response && error.response.status === 404) {
//       console.error(
//         `Trip not found (404): ${error.response.data.error.message}`
//       );
//     } else {
//       console.error(`Unexpected error: ${error.message}`);
//     }
//   }
// };

export const tripDetail = async (tripId) => {
  try {
    const response = await apiService.get(`/trips/${tripId}`);
    const data = response.data.data;
    return data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      const errorMessage =
        error.response.data?.error?.message || "Unknown error";

      if (status === 404) {
        console.error(`Trip not found (404): ${errorMessage}`);
      } else {
        console.error(`Request failed (${status}): ${errorMessage}`);
      }
    } else {
      console.error(`Unexpected error: ${error.message}`);
    }
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
