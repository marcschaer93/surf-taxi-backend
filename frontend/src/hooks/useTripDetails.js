import { useState, useEffect } from "react";

import * as TripApi from "../api/services/TripApi";

export const useTripDetails = (tripId) => {
  const [tripDetails, setTripDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripDetailsData = await TripApi.getOneTrip(tripId);
        setTripDetails(tripDetailsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingDetails(false);
      }
    };

    fetchData();
  }, [tripId]);

  return { tripDetails, loadingDetails };
};
