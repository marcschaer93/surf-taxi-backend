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

export const TripPreviewCard = ({ trip, isInMyTrips }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const tripId = trip.id;
  const isTripOwner = user && trip.owner === user.username;

  const handleFavorite = (e, tripId) => {
    e.stopPropagation();
    console.log(`added trip with id: ${tripId} to favorites. NOT IMPLEMENTED`);
  };

  const handleCardClick = () => {
    navigate(`/trips/${tripId}`, { state: { isInMyTrips } });
  };

  return (
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
        <FavoriteButton>
          <FavoriteBorderSharpIcon
            color="secondary"
            onClick={(e) => handleFavorite(e)}
            style={{ cursor: "pointer" }}
          />
        </FavoriteButton>
      )}

      {isInMyTrips && <StatusChip isTripOwner={isTripOwner} />}

      <CardContent>
        <Typography variant="h6" gutterBottom>
          {trip.startLocation} - {trip.destination}
        </Typography>

        <Typography color="text.secondary">
          <Box component="span">Stops: {trip.stops}</Box>
        </Typography>

        {/* Add other trip details here */}
      </CardContent>

      <CardActions></CardActions>
    </StyledPreviewCard>
  );
};
