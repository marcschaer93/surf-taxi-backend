// API ERROR HANDLER

export const handleApiError = (error) => {
  if (error.response) {
    const status = error.response.status;
    const errorMessage = error.response.data?.error?.message || "Unknown error";

    if (status === 404) {
      console.warn(`Trip not found (404): ${errorMessage}`);
      // throw new TripNotFoundError(errorMessage);
    } else {
      console.error(`Request failed (${status}): ${errorMessage}`);
    }
  } else {
    console.error(`Unexpected error: ${error.message}`);
  }
};
