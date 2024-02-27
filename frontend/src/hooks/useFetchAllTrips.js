import { useState, useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";

import * as TripApi from "../api/services/TripApi";
import * as UserApi from "../api/services/UserApi";
import { useAuthContext } from "../context/authProvider";
import { useMyTrips } from "../context/MyTripsProvider";

export const useFetchAllTrips = () => {
  const { user } = useAuthContext();
  const { showBoundary } = useErrorBoundary();
  const [allTrips, setAllTrips] = useState([]);
  const [loadingAllTrips, setLoadingAllTrips] = useState(true);

  useEffect(() => {
    const getAllTripsData = async () => {
      try {
        const tripsData = await TripApi.getAllTrips();
        setAllTrips(tripsData);
      } catch (error) {
        // Show error boundary
        showBoundary(error);
        console.error("Error fetching trips:", error);
        setAllTrips([]);
      } finally {
        setLoadingAllTrips(false);
      }
    };
    getAllTripsData();
  }, [user]);

  return { allTrips, setAllTrips, loadingAllTrips };
};
