import { useState, useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";

import * as TripApi from "../api/services/TripApi";
import * as UserApi from "../api/services/UserApi";
import { useAuthContext } from "../context/authProvider";

export const useAllTrips = () => {
  const { user } = useAuthContext();
  const { showBoundary } = useErrorBoundary();

  const [allTrips, setAllTrips] = useState([]);
  const [loadingAllTrips, setLoadingAllTrips] = useState(true);

  useEffect(() => {
    const getAllTripsData = async () => {
      try {
        const tripsData = await TripApi.getAllTrips();
        // exclude trips where user === trip owner
        // $$$
        // if (!user) {
        //   setAllTrips(tripsData);
        // } else {
        //   const filteredtripsData = tripsData.filter(
        //     (trip) => trip.owner !== user.username
        //   );
        //   setAllTrips(filteredtripsData);
        // }
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
