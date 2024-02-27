import { useState, useEffect } from "react";

import * as TripApi from "../api/services/TripApi";
import { useAuthContext } from "../context/authProvider";

export const useFetchTripDetails = (tripId) => {
  const { user } = useAuthContext();
  const [tripDetails, setTripDetails] = useState(null);
  const [loadingTripDetails, setLoadingTripDetails] = useState(true);

  console.log("USES TRIP DETAILS TO FETCH TRIPDETAILS");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripDetailsData = await TripApi.getOneTrip(tripId);
        setTripDetails(tripDetailsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingTripDetails(false);
      }
    };

    fetchData();
  }, [tripId, user]);

  return { tripDetails, loadingTripDetails };
};
