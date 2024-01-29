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
import { useNavigate, useLocation } from "react-router-dom";
import * as TripApi from "../../api/services/TripApi";
import * as UserApi from "../../api/services/UserApi";
import * as PassengerApi from "../../api/services/PassengerApi";
import { toast } from "react-toastify";
import { useTripData } from "../../hooks/useTripData";

const FavoriteButton = styled(Button)(({ theme }) => ({
  color: theme.palette.error.main,
}));

export const TripCardDetails = ({ trip, handleJoinRequest }) => {
  const { user } = useAuthContext();
  const { setAllTrips } = useTripData();
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
  } = trip;

  const userAsPassenger = trip.passengers.find(
    (p) => p.username === user.username
  );

  const isTripOwner = owner === user.username;
  // const status = reservation ? reservation.reservationStatus : "Join Trip";
  const status = userAsPassenger
    ? userAsPassenger.reservationStatus
    : "Join Trip";
  const userTripInteractionStatus = isTripOwner ? null : status;

  const handleFavorite = (e, tripId) => {
    console.log(`added trip with id: ${tripId} to favorites. NOT IMPLEMENTED`);
  };

  // const handleJoinRequest = async (tripId) => {
  //   try {
  //     console.log("Request to join. NOT IMPLEMENTED");
  //     const newJoinRequest = await PassengerApi.requestToJoin(tripId);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleDeleteTripAsOwner = async (e) => {
    e.stopPropagation();
    try {
      await UserApi.deleteMyTrip(tripId, user.username);
      setAllTrips((prevTrips) => {
        const updatedTrips = prevTrips.filter((trip) => trip.id !== tripId);
        return updatedTrips;
      });
      toast.success("Successfully deleted trip!");
      navigate(-1);
    } catch (error) {
      console.error(error);
      toast.error(`Failed to remove trip`);
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
            onClick={() => handleJoinRequest()}
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

        {isTripOwner && (
          <Button
            onClick={(e) => handleDeleteTripAsOwner(e)}
            sx={{ color: isTripOwner ? "red" : "green" }}
            size="small"
            variant="text"
          >
            ❌
          </Button>
        )}

        {handleFavorite && (
          <FavoriteButton
            size="small"
            onClick={(e) => handleFavorite(e, tripId)}
          >
            <FavoriteTwoToneIcon />
          </FavoriteButton>
        )}
      </CardActions>
    </Card>
  );
};
