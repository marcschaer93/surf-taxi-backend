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
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";

import { useAuthContext } from "../../context/authProvider";
import { theme } from "../../utils/theme";
import { StatusChip } from "../../components/ui/StatusChip";
import { StyledPreviewCard } from "../../styles/cardStyles";
import { FavoriteButton } from "../../styles/buttonStyles";
import { useTripDetails } from "../../hooks/useTripDetails";
import { useFavorite } from "../../hooks/useFavorite";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const TripPreviewCard = ({ tripId, isInMyTrips }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  // trip details custom hook
  const { tripDetails, loadingDetails } = useTripDetails(tripId);
  const isTripOwner = user && tripDetails?.owner === user.username;

  const { isFavorited, toggleFavorite, loading } = useFavorite(tripId);

  const handleFavorite = (e, tripId) => {
    e.stopPropagation();
    toggleFavorite();
  };

  const handleCardClick = () => {
    navigate(`/trips/${tripId}`, { state: { tripDetails, isInMyTrips } });
  };

  if (loadingDetails) return <Box>Loading...</Box>;

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
        {!isInMyTrips && (
          <FavoriteButton onClick={handleFavorite} color="secondary">
            {isFavorited ? (
              <FavoriteIcon style={{ cursor: "pointer" }} />
            ) : (
              <FavoriteBorderSharpIcon style={{ cursor: "pointer" }} />
            )}
          </FavoriteButton>
        )}

        {isInMyTrips && <StatusChip isTripOwner={isTripOwner} />}

        <CardContent>
          <Typography variant="h6" gutterBottom>
            {tripDetails.startLocation} - {tripDetails.destination}
          </Typography>

          <Typography color="text.secondary">
            <Box component="span">Stops: {tripDetails.stops}</Box>
          </Typography>

          {/* Add other trip details here */}
        </CardContent>

        <CardActions></CardActions>
      </StyledPreviewCard>
    </>
  );
};
