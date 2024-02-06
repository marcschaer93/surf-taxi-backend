import { useState, useEffect } from "react";

import * as TripApi from "../api/services/TripApi";
import { useAuthContext } from "../context/authProvider";

export const useTripDetails = (tripId) => {
  const { user } = useAuthContext();
  const [tripDetails, setTripDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(true);

  console.log("USES TRIP DETAILS TO FETCH TRIPDETAILS");

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
  }, [tripId, user]);

  return { tripDetails, loadingDetails };
};
