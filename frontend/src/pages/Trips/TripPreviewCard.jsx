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
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authProvider";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";

const FavoriteButton = styled(Button)(({ theme }) => ({
  color: theme.palette.error.main,
}));

export const TripPreviewCard = ({ trip }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const tripId = trip.id;
  const isTripOwner = user && trip.owner === user.username;

  const StyledCard = styled(Card)(({ theme, isTripOwner }) => ({
    position: "relative",
    borderColor: isTripOwner
      ? theme.palette.contrast.main
      : theme.palette.grey[800],
    borderWidth: "0.5px",
    cursor: "pointer",
    transition: "background 0.3s ease",
    margin: "20px 0", // Add margin to create space between cards
    width: "100%",

    "&:hover": {
      background: theme.palette.action.hover,
    },
  }));

  const StyledChip = styled(Chip)({
    position: "absolute",
    top: 18, // Adjust the top value as needed
    right: 18, // Adjust the right value as needed
    fontSize: "8px",
    fontWeight: "bold",
  });

  const handleFavorite = (e, tripId) => {
    e.stopPropagation();
    console.log(`added trip with id: ${tripId} to favorites. NOT IMPLEMENTED`);
  };

  const handleJoinRequest = (e, tripId) => {
    e.stopPropagation();
    console.log("Request to join. NOT IMPLEMENTED");
  };

  const handleCardClick = () => {
    navigate(`/trips/${tripId}`);
  };

  return (
    <StyledCard
      variant="outlined"
      onClick={handleCardClick}
      isTripOwner={isTripOwner}
    >
      {isTripOwner ? (
        <StyledChip
          sx={{ backgroundColor: "#d41b64", color: "white" }}
          label="Owner"
          variant="filled"
          size="small"
        />
      ) : (
        <StyledChip
          label="Passenger"
          color="primary"
          variant="filled"
          size="small"
        />
      )}

      <CardContent>
        <Typography variant="h6" gutterBottom>
          {trip.startLocation} - {trip.destination}
        </Typography>

        <Typography color="text.secondary">
          <Box component="span">Stops: {trip.stops}</Box>
        </Typography>

        {/* Add other trip details here */}
      </CardContent>

      <CardActions>
        {handleFavorite && (
          <FavoriteButton size="small" onClick={(e) => handleFavorite(e)}>
            <FavoriteBorderSharpIcon color="secondary" />
          </FavoriteButton>
        )}
      </CardActions>
    </StyledCard>
  );
};
