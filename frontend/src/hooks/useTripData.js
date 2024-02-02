import { useState, useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";

import * as TripApi from "../api/services/TripApi";
import * as UserApi from "../api/services/UserApi";
import { useAuthContext } from "../context/authProvider";

export const useTripData = () => {
  const { user } = useAuthContext();
  const { showBoundary } = useErrorBoundary();

  const [allTrips, setAllTrips] = useState([]);
  const [allTripsLoading, setAllTripsLoading] = useState(true);

  const [myTrips, setMyTrips] = useState([]);
  const [myTripsLoading, setMyTripsLoading] = useState(true);

  const [error, setError] = useState(null);

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
        setAllTripsLoading(false);
      }
    };
    getAllTripsData();
  }, [user]);

  useEffect(() => {
    const getAllMyTrips = async () => {
      try {
        const myTripsData = await UserApi.getAllUserTrips(user.username);
        console.log("myTripsData", myTripsData);
        setMyTrips(myTripsData);
      } catch (error) {
        // Show error boundary
        showBoundary(error);
        console.error("Error fetching trips:", error);
        setMyTrips([]);
      } finally {
        setMyTripsLoading(false);
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
      setMyTripsLoading(false);
    }
  };

  const deleteMyTrip = async (tripId) => {
    try {
      await UserApi.deleteMyTrip(tripId, user.username);
      setMyTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== tripId));
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return { allTrips, setAllTrips, addTrip, deleteMyTrip, myTrips, setMyTrips };
};
