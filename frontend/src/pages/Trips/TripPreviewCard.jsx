import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  styled,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../context/authProvider";
import { theme } from "../../utils/theme";
import { StatusChip } from "../../components/ui/StatusChip";
import { StyledPreviewCard } from "../../styles/cardStyles";
import { useTripDetails } from "../../hooks/useTripDetails";
import { useFavorite } from "../../hooks/useFavorite";
import { TripDetails } from "./TripDetails";
import { useState } from "react";
import { FavoriteButton } from "../../components/ui/FavoriteButton";
import { format } from "date-fns";

import { TripCardContent } from "./TripCardContent";

export const TripPreviewCard = ({ tripData, isInMyTrips }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const tripId = tripData.id;
  const isTripOwner = user && tripData?.owner === user.username;
  // const tripNotificationCount = tripNotifications
  //   ? tripNotifications.length
  //   : 0;

  // favorite trips hook (only for logged in users)
  const { isFavorited, toggleFavorite, loading } = user
    ? useFavorite(tripId)
    : {};

  const handleFavorite = (e, tripId) => {
    e.stopPropagation();
    toggleFavorite();
  };

  const handleCardClick = () => {
    // navigate(`/trips/${tripId}`, {
    //   state: { tripDetails, isInMyTrips, tripNotifications },
    // });
    navigate(`/trips/${tripId}`);
  };

  const { startLocation, destination, stops, seats, date, travelInfo } =
    tripData;

  return (
    <>
      <StyledPreviewCard
        variant="outlined"
        onClick={handleCardClick}
        sx={{
          borderColor: isTripOwner
            ? theme.palette.contrast.main
            : theme.palette.grey[800],
        }}
      >
        {!isInMyTrips && user && (
          <FavoriteButton
            handleFavorite={handleFavorite}
            isFavorited={isFavorited}
          ></FavoriteButton>
        )}

        {isInMyTrips && <StatusChip isTripOwner={isTripOwner} />}

        <TripCardContent tripData={tripData} />

        <CardActions></CardActions>
      </StyledPreviewCard>
    </>
  );
};
