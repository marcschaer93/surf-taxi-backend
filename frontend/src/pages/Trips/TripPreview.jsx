import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import { styled } from "@mui/material";

import { TripCardPreview } from "./TripCardPreview";
import { useAuthContext } from "../../context/authProvider";

export const TripPreview = ({ trip, userTrips }) => {
  const { user } = useAuthContext();
  const { startLocation, destination, seats, data, stops, tripId } = trip;

  const { myTripsAsPassenger, myTripsAsOwner } = userTrips;

  //   if (myTripsAsPassenger) {
  //     const tripReservationStatus = myTripsAsPassenger
  //       .filter((trip) => trip.tripId === tripId)
  //       .map((trip) => trip.reservationStatus);
  //   }

  //   if (myTripsAsOwner) {
  //     const isTripOwner = myTripsAsOwner.filter(
  //       (trip) => trip.tripId === tripId && trip.owner === user.username
  //     );
  //   }
  const isTripOwner =
    myTripsAsOwner?.some(
      (trip) => trip.tripId === tripId && trip.tripOwner === user.username
    ) || false;

  const otherStatus = isTripOwner ? "Owner" : "Request Trip";

  const tripReservationStatus =
    myTripsAsPassenger?.find((trip) => trip.tripId === tripId)
      ?.reservationStatus || otherStatus;

  console.log("myTAP", myTripsAsPassenger);
  console.log("myTAO", myTripsAsOwner);
  console.log("status:", tripReservationStatus);
  console.log("owner", isTripOwner);

  const FavoriteButton = styled(Button)(({ theme }) => ({}));

  const handleFavorite = (e) => {
    e.stopPropagation();
    console.log("added to favorites. NOT IMPLEMENTED");
  };

  const handleJoinRequest = (e, tripId) => {
    console.log("tripId", tripId);
    e.stopPropagation();
    console.log("Request to join. NOT IMPLEMENTED");
  };

  return (
    <>
      <Box>
        <TripCardPreview
          trip={trip}
          handleFavorite={handleFavorite}
          handleJoinRequest={handleJoinRequest}
        />
      </Box>
    </>
  );
};
