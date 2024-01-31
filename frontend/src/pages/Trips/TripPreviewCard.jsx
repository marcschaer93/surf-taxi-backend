import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  styled,
} from "@mui/material";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authProvider";

const FavoriteButton = styled(Button)(({ theme }) => ({
  color: theme.palette.error.main,
}));

export const TripPreviewCard = ({ trip }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const tripId = trip.id;
  const isTripOwner = user && trip.owner === user.username;
  const defaultButtonStatus = isTripOwner ? "Owner" : "Request Trip";
  //   const userTripInteractionStatus = reservation?.reservationStatus || null;

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
    <Card variant="outlined" onClick={handleCardClick}>
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
        <Button size="small" variant="outlined">
          More...
        </Button>

        {/* {!isTripOwner && userTripInteractionStatus && (
          <Button size="small" variant="outlined">
            {userTripInteractionStatus}
          </Button>
        )} */}

        {isTripOwner && (
          <Button
            sx={{ color: isTripOwner ? "red" : "green" }}
            size="small"
            variant="text"
          >
            owner
          </Button>
        )}

        {handleFavorite && (
          <FavoriteButton size="small" onClick={(e) => handleFavorite(e)}>
            <FavoriteTwoToneIcon />
          </FavoriteButton>
        )}
      </CardActions>
    </Card>
  );
};
