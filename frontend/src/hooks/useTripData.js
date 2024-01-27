import { useState, useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";

import * as TripApi from "../api/services/TripApi";
import * as UserApi from "../api/services/UserApi";
import { useAuthContext } from "../context/authProvider";

export const useTripData = () => {
  const { user } = useAuthContext();
  const { showBoundary } = useErrorBoundary();

  const [allTrips, setAllTrips] = useState([]);
  const [userTrips, setUserTrips] = useState([]);

  const [error, setError] = useState(null);
  const [allTripsLoading, setAllTripsLoading] = useState(true);
  const [userTripsLoading, setUserTripsLoading] = useState(true);

  useEffect(() => {
    const getAllTripsData = async () => {
      try {
        const tripsData = await TripApi.getAllTrips();

        setAllTrips(tripsData);
        setAllTripsLoading(false);
      } catch (error) {
        // Show error boundary
        showBoundary(error);

        console.error("Error fetching trips:", error);
        setAllTrips([]);
        setAllTripsLoading(false);
      }
    };

    const getUserTripsData = async () => {
      try {
        const { username } = user;
        if (username) {
          const userTripsData = await UserApi.getAllUserTrips(username);
          setUserTrips(userTripsData);
          setUserTripsLoading(false);
        } else {
          throw new Error("User information not available.");
        }
      } catch (error) {
        // Show error boundary
        showBoundary(error);
        console.error("Error fetching trips:", error);
        setUserTrips([]);
        setUserTripsLoading(false);
      }
    };
    getAllTripsData();
    getUserTripsData();
  }, []);

  const addTrip = async (tripData) => {
    // parse seats to number
    const parsedSeats = parseInt(tripData.seats, 10);
    const newTrip = await Api.createTrip({ ...tripData, seats: parsedSeats });

    if (newTrip) {
      // Adding the new trip to the current list of trips if successful
      setAllTrips((prevTrips) => [...prevTrips, newTrip]);
      console.log("Trip created successfully:", newTrip);
    } else {
      // Using this block later to notify the user of an unsuccessful trip creation
      console.log("Error creating new Trip");
    }
  };

  return { allTrips, userTrips, setAllTrips, addTrip };
};
