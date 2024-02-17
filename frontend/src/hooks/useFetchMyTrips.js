import { useState, useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";

import * as TripApi from "../api/services/TripApi";
import * as UserApi from "../api/services/UserApi";
import { useAuthContext } from "../context/authProvider";

export const useFetchMyTrips = () => {
  const { user } = useAuthContext();
  const { showBoundary } = useErrorBoundary();
  const [myTrips, setMyTrips] = useState([]);
  const [loadingMyTrips, setLoadingMyTrips] = useState(true);

  // Get user trips
  useEffect(() => {
    const getAllMyTrips = async () => {
      try {
        const myTripsData = await UserApi.getAllUserTrips(user.username);
        setMyTrips(myTripsData);
      } catch (error) {
        // Show error boundary
        showBoundary(error);
        console.error("Error fetching trips:", error);
        setMyTrips([]);
      } finally {
        setLoadingMyTrips(false);
      }
    };
    if (user) {
      getAllMyTrips();
    } else {
      setLoadingMyTrips(false); // Ensure loading is stopped if there's no user
    }
  }, [user]);

  return { myTrips, setMyTrips, loadingMyTrips };
};
