import { useState, useEffect } from "react";
// import * as Api from "../services/TripApi";
import * as TripApi from "../api/services/TripApi";

export const useTripData = () => {
  const [trips, setTrips] = useState([]);
  const [tripsLoading, setTripsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allTrips = await TripApi.getAllTrips();
        setTrips(allTrips);
        setTripsLoading(false);
      } catch (error) {
        console.error("Error fetching trips:", error);
        setTrips([]);
        setTripsLoading(false);
      }
    };
    fetchData();
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
