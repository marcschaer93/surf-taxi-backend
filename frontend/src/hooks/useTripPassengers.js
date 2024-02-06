import { useState, useEffect } from "react";

import * as PassengerApi from "../api/services/PassengerApi";

export const useTripPassengers = (tripId, username) => {
  const [passengers, setPassengers] = useState([]);
  const [loadingPassengers, setLoadingPassengers] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripPassengersData = await PassengerApi.getTripPassengers(tripId);
        setPassengers(tripPassengersData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingPassengers(false);
      }
    };

    fetchData();
  }, [tripId]);

  return {
    passengers,
    setPassengers,
    loadingPassengers,
  };
};
