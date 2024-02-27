import React, { useState, useEffect } from "react";
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
// import { CardStatusChip } from "../../components/ui/CardStatusChip";
import { FavoriteButton } from "../../components/ui/FavoriteButton";
import { StyledPreviewCard } from "../../styles/cardStyles";
import { TripCardContent } from "./TripCardContent";
import { useToggleFavoriteTrip } from "../../hooks/useToggleFavoriteTrip";
import { theme } from "../../utils/theme";
import { useMyTrips } from "../../context/MyTripsProvider";
import { StatusChip } from "../../components/ui/StatusChip";

// DATA FLOW
// tripDetails       ===>     from parent
// isTripOrganizer   ===>     from parent
// isInMyTrips       ===>     from parent
//userReservation    ===>     API Call ALWAYS

const TripPreviewCard = ({ tripDetails, isInMyTrips, isTripOrganizer }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const tripId = tripDetails?.id;

  console.log("TRIP DETAIULS", tripDetails);

  // Favorite trips hook (only for logged in users)
  const { isFavorited, toggleFavorite } = useToggleFavoriteTrip(tripId);

  const handleFavorite = (e, tripId) => {
    e.stopPropagation();
    toggleFavorite();
  };

  const handleCardClick = () => {
    navigate(`/trips/${tripId}`, { state: { tripDetails } });
  };

  return (
    <StyledPreviewCard
      variant="outlined"
      onClick={handleCardClick}
      sx={{
        borderColor: isTripOrganizer
          ? theme.palette.contrast.main
          : theme.palette.grey[800],
      }}
    >
      {!isInMyTrips && !isTripOrganizer && user && (
        <FavoriteButton
          handleFavorite={handleFavorite}
          isFavorited={isFavorited}
        ></FavoriteButton>
      )}

      {/* {isInMyTrips || isTripOrganizer ? (
        <CardStatusChip
          // isTripOwner={isTripOrganizer}
          // status={tripReservation?.reservationStatus}
          status={tripDetails.userReservationStatus}
        />
      ) : null} */}

      {/* {isInMyTrips ? (
        <StatusChip
          status={tripDetails.userReservationStatus}
          isTripOrganizer={isTripOrganizer}
        />
      ) : null} */}

      {isInMyTrips ? (
        <Box sx={{ position: "absolute", top: 18, right: 18 }}>
          <StatusChip
            status={tripDetails.userReservationStatus}
            isTripOrganizer={isTripOrganizer}
          />
        </Box>
      ) : null}

      <TripCardContent preview={true} tripDetails={tripDetails} />

      <CardActions></CardActions>
    </StyledPreviewCard>
  );
};

export default TripPreviewCard;
