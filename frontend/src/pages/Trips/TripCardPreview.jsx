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

export const TripCardPreview = ({ data, onAction, reservation }) => {
  console.log("DATA$$$", data);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const {
    startLocation,
    destination,
    date,
    stops,
    tripOwner: owner,
    travelInfo,
    costs,
    passengers,
    id: tripId,
  } = data;

  const isTripOwner = owner === user.username;
  console.log("isTripOwner", isTripOwner);
  const defaultButtonStatus = isTripOwner ? "Owner" : "Request Trip";
  const userTripInteractionStatus = reservation?.reservationStatus || null;

  const handleFavorite = (e, id) => {
    e.stopPropagation();
    console.log(`added trip with id: ${id} to favorites. NOT IMPLEMENTED`);
  };

  const handleJoinRequest = (e, tripId) => {
    console.log("tripId", tripId);
    e.stopPropagation();
    console.log("Request to join. NOT IMPLEMENTED");
  };

  const handleCardClick = () => {
    console.log("tripID$$$$", tripId);
    // navigate(`/trips/${tripId}`, { state: { trip } });
    navigate(`/trips/${tripId}`);
  };

  return (
    <Card variant="outlined" onClick={() => handleCardClick()}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {startLocation} - {destination}
        </Typography>

        <Typography color="text.secondary">
          <Box component="span">Stops: {stops}</Box>
        </Typography>

        {/* Add other trip details here */}
      </CardContent>

      <CardActions>
        <Button size="small" variant="outlined">
          More...
        </Button>

        {!isTripOwner && userTripInteractionStatus && (
          <Button size="small" variant="outlined">
            {userTripInteractionStatus}
          </Button>
        )}

        {isTripOwner && (
          <Button sx={{ color: "red" }} size="small" variant="text">
            Owner
          </Button>
        )}

        {handleFavorite && (
          <FavoriteButton
            size="small"
            onClick={(e) => handleFavorite(e, data.id)}
          >
            <FavoriteTwoToneIcon />
          </FavoriteButton>
        )}
      </CardActions>
    </Card>
  );
};
