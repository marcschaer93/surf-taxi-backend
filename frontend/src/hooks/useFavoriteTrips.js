// useFavoriteTrips.js
import { useEffect, useState } from "react";
import * as TripApi from "../api/services/TripApi";

export const useFavoriteTrips = (favoriteIds) => {
  const [favoriteTrips, setFavoriteTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavoriteTrips = async () => {
      try {
        if (favoriteIds.length === 0) {
          setFavoriteTrips([]);
          setLoading(false);
          return;
        }

        const promises = favoriteIds.map((id) => TripApi.getOneTrip(id));
        const trips = await Promise.all(promises);
        setFavoriteTrips(trips);
      } catch (error) {
        console.error("Error fetching favorite trips:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteTrips();
  }, [favoriteIds]);

  return { favoriteTrips, loading, error };
};
