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
import { CardStatusChip } from "../../components/ui/CardStatusChip";
import { FavoriteButton } from "../../components/ui/FavoriteButton";
import { useUserReservation } from "../../hooks/useUserReservation";
import { StyledPreviewCard } from "../../styles/cardStyles";
import { TripCardContent } from "./TripCardContent";
import { useFavorite } from "../../hooks/useFavorite";
import { theme } from "../../utils/theme";

// DATA FLOW
// tripDetails       ===>     from parent
// isTripOrganizer   ===>     from parent
// isInMyTrips       ===>     from parent
//userReservation    ===>     API Call ALWAYS

const TripPreviewCard = ({ tripDetails, isInMyTrips, isTripOrganizer }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const tripId = tripDetails?.id;

  // Use custom hook to fetch user reservation data
  const { userReservation, loading: loadingReservation } = useUserReservation(
    user,
    tripId,
    isTripOrganizer,
    isInMyTrips
  );

  // Favorite trips hook (only for logged in users)
  const { isFavorited, toggleFavorite } = useFavorite(tripId);

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

      {isInMyTrips || isTripOrganizer ? (
        <CardStatusChip
          isTripOwner={isTripOrganizer}
          status={userReservation?.reservationStatus}
        />
      ) : null}

      <TripCardContent preview={true} tripDetails={tripDetails} />

      <CardActions></CardActions>
    </StyledPreviewCard>
  );
};

export default TripPreviewCard;