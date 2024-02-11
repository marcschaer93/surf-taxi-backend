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
import { CardStatusChip } from "../../components/ui/CardStatusChip";
import { StyledPreviewCard } from "../../styles/cardStyles";
import { useTripDetails } from "../../hooks/useTripDetails";
import { useFavorite } from "../../hooks/useFavorite";
import { TripDetails } from "./TripDetails";
import { useState } from "react";
import { FavoriteButton } from "../../components/ui/FavoriteButton";
import { format } from "date-fns";
import * as UserApi from "../../api/services/UserApi";
import { MyTripCard } from "./MyTripCard";

import { TripCardContent } from "./TripCardContent";

export const TripPreviewCard = ({ tripDetails, isInMyTrips }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const tripId = tripDetails?.id;
  const { startLocation, destination, stops, seats, date, travelInfo } =
    tripDetails;
  const [userPassenger, setUserPassenger] = useState(null);
  const [isTripOwner, setIsTripOwner] = useState(false);

  useEffect(() => {
    setIsTripOwner(user.username === tripDetails.owner);
  }, [tripDetails]);

  // Check user status if not trip owner
  // $$ Move to PASSENGER API ? CHANGE NAME getOneUserReservation ?
  useEffect(() => {
    const fetchUserReservation = async () => {
      try {
        const userPassengerData = await UserApi.getOneUserReservation(
          user.username,
          tripId
        );
        setUserPassenger(userPassengerData);
      } catch (error) {
        console.error(error);
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
    // navigate(`/trips/${tripId}`, {
    //   state: { isTripOwner },
    // });
    if (isInMyTrips) {
      navigate(`/my-trips/${tripId}`);
    } else {
      navigate(`/trips/${tripId}`);
    }
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
          <CardStatusChip
            isTripOwner={isTripOwner}
            status={userPassenger?.reservationStatus}
          />
        )}

        <TripCardContent preview={true} tripDetails={tripDetails} />

        <CardActions></CardActions>
      </StyledPreviewCard>
    </>
  );
};
