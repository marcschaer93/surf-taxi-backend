import { useState, useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";

import * as TripApi from "../api/services/TripApi";
import * as UserApi from "../api/services/UserApi";
import { useAuthContext } from "../context/authProvider";

export const useMyTrips = () => {
  const { user } = useAuthContext();
  const { showBoundary } = useErrorBoundary();

  const [myTrips, setMyTrips] = useState([]);
  const [loadingMyTrips, setLoadingMyTrips] = useState(true);

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
    }
  }, [user]);

  const addTrip = async (tripData) => {
    try {
      // parse seats to number
      const parsedSeats = parseInt(tripData.seats, 10);
      const newTrip = await TripApi.createNewTrip({
        ...tripData,
        seats: parsedSeats,
      });

      // setAllTrips((prevTrips) => [...prevTrips, newTrip]);
      setMyTrips((prevTrips) => [...prevTrips, newTrip]);
      console.log("Trip created successfully:", newTrip);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMyTrips(false);
    }
  };

  const deleteMyTrip = async (tripId) => {
    try {
      await UserApi.deleteMyTrip(tripId, user.username);
      setMyTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== tripId));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMyTrips(false);
    }
  };

  return { myTrips, setMyTrips, addTrip, deleteMyTrip, loadingMyTrips };
};
