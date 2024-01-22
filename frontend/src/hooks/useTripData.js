import { useState, useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";

import * as TripApi from "../api/services/TripApi";

export const useTripData = () => {
  const { showBoundary } = useErrorBoundary();

  const [trips, setTrips] = useState([]);
  const [error, setError] = useState(null);
  const [tripsLoading, setTripsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const allTrips = await TripApi.getAllTrips();
        setTrips(allTrips);
        setTripsLoading(false);
      } catch (error) {
        // Show error boundary
        showBoundary(error);

        console.error("Error fetching trips:", error);
        setTrips([]);
        setTripsLoading(false);
      }
    };
    getData();
  }, []);

  const addTrip = async (tripData) => {
    // parse seats to number
    const parsedSeats = parseInt(tripData.seats, 10);
    const newTrip = await Api.createTrip({ ...tripData, seats: parsedSeats });

    if (newTrip) {
      // Adding the new trip to the current list of trips if successful
      setTrips((prevTrips) => [...prevTrips, newTrip]);
      console.log("Trip created successfully:", newTrip);
    } else {
      // Using this block later to notify the user of an unsuccessful trip creation
      console.log("Error creating new Trip");
    }
  };

  return { trips, setTrips, addTrip };
};
