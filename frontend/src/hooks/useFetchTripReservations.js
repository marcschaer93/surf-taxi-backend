import { useState, useEffect } from "react";

import * as ReservationApi from "../api/services/ReservationApi";

export const useFetchTripReservations = (tripId, username) => {
  const [reservations, setReservations] = useState([]);
  const [loadingReservations, setLoadingReservations] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripReservationData = await ReservationApi.getAllTripReservations(
          tripId
        );
        setReservations(tripReservationData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingReservations(false);
      }
    };

    fetchData();
  }, [tripId]);

  return {
    reservations,
    setReservations,
    loadingReservations,
  };
};
