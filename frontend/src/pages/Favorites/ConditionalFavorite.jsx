import React from "react";
import { useToggleFavoriteTrip } from "../../hooks/useToggleFavoriteTrip";
import { FavoriteButton } from "../../components/ui/FavoriteButton";

export const ConditionalFavorite = ({ tripId }) => {
  const { isFavorited, toggleFavorite } = useToggleFavoriteTrip(tripId);

  const handleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite();
  };

  return (
    <FavoriteButton handleFavorite={handleFavorite} isFavorited={isFavorited} />
  );
};
