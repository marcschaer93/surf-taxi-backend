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
import { useEffect } from "react";

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
import * as UserApi from "../../api/services/UserApi";

import { TripCardContent } from "./TripCardContent";

export const TripPreviewCard = ({ tripData, isInMyTrips, isTripOwner }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const tripId = tripData.id;
  const { startLocation, destination, stops, seats, date, travelInfo } =
    tripData;
  const [userStatus, setUserStatus] = useState(null);

  // Check user status if not trip owner
  // $$ Move to PASSENGER API ? CHANGE NAME getOneUserReservation ?
  useEffect(() => {
    const fetchUserReservation = async () => {
      try {
        const userPassenger = await UserApi.getOneUserReservation(
          user.username,
          tripId
        );
        setUserStatus(userPassenger.reservationStatus);
      } catch (error) {
        console.error(error);
        // Handle error here, e.g., set a default status or show an error message
      }
    };

    if (!isTripOwner && isInMyTrips) {
      fetchUserReservation();
    }
  }, [isTripOwner, tripId, user]);

  // favorite trips hook (only for logged in users)
  const { isFavorited, toggleFavorite, loading } = user
    ? useFavorite(tripId)
    : {};

  const handleFavorite = (e, tripId) => {
    e.stopPropagation();
    toggleFavorite();
  };

  const handleCardClick = () => {
    navigate(`/trips/${tripId}`, {
      state: { isTripOwner },
    });
  };

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

        {isInMyTrips && (
          <StatusChip isTripOwner={isTripOwner} status={userStatus} />
        )}

        <TripCardContent preview={true} tripData={tripData} />

        <CardActions></CardActions>
      </StyledPreviewCard>
    </>
  );
};
