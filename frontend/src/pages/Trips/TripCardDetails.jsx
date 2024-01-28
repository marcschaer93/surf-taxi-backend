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
import { useAuthContext } from "../../context/authProvider";
import { useNavigate } from "react-router-dom";

const FavoriteButton = styled(Button)(({ theme }) => ({
  color: theme.palette.error.main,
}));

export const TripCardDetails = ({ data, reservation }) => {
  console.log("RESERVATION", reservation);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const {
    startLocation,
    destination,
    seats,
    date,
    stops,
    id: tripId,
    owner,
    passengers,
  } = data;

  const isTripOwner = owner === user.username;
  const status = reservation ? reservation.reservationStatus : "Join Trip";
  const userTripInteractionStatus = isTripOwner ? null : status;

  const handleFavorite = (e, id) => {
    console.log(`added trip with id: ${id} to favorites. NOT IMPLEMENTED`);
  };

  const handleJoinRequest = async (tripId) => {
    try {
      console.log("Request to join. NOT IMPLEMENTED");
      const newJoinRequest = await PassengerApi.requestToJoin(tripId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = () => {
    // Navigate back to the previous page
    navigate(-1);
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {startLocation} - {destination}
        </Typography>

        <Typography color="text.secondary">
          <Box component="span">Stops: {stops}</Box>
        </Typography>

        {passengers && isTripOwner && (
          <Typography color="text.secondary">
            Passengers:{" "}
            {passengers.map((p) => (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>{p.username}</Typography>
                <Typography>{p.status}</Typography>
              </Box>
            ))}
          </Typography>
        )}

        {/* Add other trip details here */}
      </CardContent>

      <CardActions>
        {!isTripOwner && (
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleJoinRequest(data.id)}
          >
            {userTripInteractionStatus}
          </Button>
        )}
        <Button size="small" onClick={handleBack} variant="outlined">
          Go Back
        </Button>

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
