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
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import { theme } from "../../utils/theme";
import { StatusChip } from "../../components/ui/StatusChip";

export const TripPreviewCard = ({ trip, isInMyTrips }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const tripId = trip.id;
  const isTripOwner = user && trip.owner === user.username;

  const StyledCard = styled(Card)(({ theme }) => ({
    position: "relative",
    borderWidth: "1px", // Increase border width for a more prominent look
    borderRadius: theme.shape.borderRadius, // Use the theme's border radius for consistency
    overflow: "hidden", // Hide overflow for better aesthetics
    cursor: "pointer",
    transition: "background 0.3s ease, transform 0.3s ease",
    margin: "20px 0", // Add margin to create space between cards
    width: "100%",
    "&:hover": {
      background: theme.palette.action.hover,
      transform: "scale(1.02)", // Scale the card slightly on hover for a subtle effect
      boxShadow: `0 5px 15px rgba(0, 0, 0, 0.2)`, // Add a shadow on hover
    },
    "&:active": {
      transform: "scale(0.98)", // Shrink the card slightly on click
    },
  }));

  const FavoriteButton = styled(Box)({
    position: "absolute",
    top: 18,
    right: 18,
    fontSize: "8px",
    fontWeight: "bold",
  });

  const handleFavorite = (e, tripId) => {
    e.stopPropagation();
    console.log(`added trip with id: ${tripId} to favorites. NOT IMPLEMENTED`);
  };

  const handleCardClick = () => {
    navigate(`/trips/${tripId}`, { state: { isInMyTrips } });
  };

  return (
    <StyledCard
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
    </StyledCard>
  );
};
