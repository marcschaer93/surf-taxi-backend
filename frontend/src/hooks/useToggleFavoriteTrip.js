import { useState } from "react";
import { useAuthContext } from "../context/authProvider";
import * as UserApi from "../api/services/UserApi";

export const useToggleFavoriteTrip = (tripId) => {
  tripId = parseInt(tripId);
  const { user, updateUser } = useAuthContext();
  const [isFavorited, setIsFavorited] = useState(
    user.favoriteIds?.includes(tripId) || false
  );

  const [loading, setLoading] = useState(false);

  const toggleFavorite = async () => {
    try {
      setLoading(true);
      let updatedFavoriteIds;

      if (isFavorited) {
        // Remove tripId from favoriteIds
        updatedFavoriteIds = user.favoriteIds.filter((id) => id !== tripId);
        await UserApi.updateUserFavoriteIds(updatedFavoriteIds, user.username);
      } else {
        // Add tripId to favoriteIds
        if (user.favoriteIds) {
          updatedFavoriteIds = [...user.favoriteIds, tripId];
        } else {
          updatedFavoriteIds = [tripId];
        }
        await UserApi.updateUserFavoriteIds(updatedFavoriteIds, user.username);
      }

      await updateUser({ favoriteIds: updatedFavoriteIds });

      setIsFavorited((prev) => !prev);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setLoading(false);
    }
  };

  return { isFavorited, toggleFavorite, loading };
};
