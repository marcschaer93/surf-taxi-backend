import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";

import { styled } from "@mui/material";
import { useParams } from "react-router-dom";
import * as TripApi from "../../api/services/TripApi";
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import { TripCardDetails } from "./TripCardDetails";
import * as PassengerApi from "../../api/services/PassengerApi";
import * as UserApi from "../../api/services/UserApi";
import { useAuthContext } from "../../context/authProvider";

export const TripDetails = () => {
  // use the show the error in async function (ERROR BOUNDARY LIMITATIONS)
  const { showBoundary } = useErrorBoundary();
  const { user } = useAuthContext();

  const location = useLocation();
  //   const { myTripData } = location.state;
  //   console.log("MyTripData", myTripData);
  const { tripId } = useParams();
  //   console.log("tripId", tripId);

  const [trip, setTrip] = useState(null);
  const [loadingTrips, setIsLoadingTrips] = useState(true);
  const [userReservation, setUserReservation] = useState(null);
  const [loadingUserReservation, setIsLoadingUserReservation] = useState(true);

  const FavoriteButton = styled(Button)(({ theme }) => ({}));

  const myTripData = location.state?.myTripData;
  if (myTripData) {
    // const { myTripData } = location.state;

    return (
      <>
        <Box>
          <TripCardDetails data={myTripData} />
        </Box>
      </>
    );
  }

  useEffect(() => {
    const getTripDetails = async () => {
      try {
        const tripDetails = await TripApi.getOneTrip(tripId);
        if (!tripDetails) {
          toast.error("Trip not found. Please check the provided ID.");
          // redirect
        }
        console.log("tripDetails", tripDetails);
        setTrip(tripDetails);
        setIsLoadingTrips(false);
      } catch (error) {
        setIsLoadingTrips(false);
        showBoundary(error);
        console.error("Error fetching trip:", error);
        // Handle error, e.g., redirect to an error page
      }
    };

    getTripDetails();
  }, [tripId]);

  useEffect(() => {
    const getUserReservation = async () => {
      try {
        if (user) {
          const userReservation = await UserApi.getOneUserReservation(
            user.username,
            tripId
          );
          //   console.log("userReservation", userReservation);
          setUserReservation(userReservation);
          setIsLoadingUserReservation(false);
        }
      } catch (error) {
        setIsLoadingUserReservation(false);
        showBoundary(error);
        console.error("Error fetching reservation:", error);
      }
    };

    if (!trip) {
      // Trip is still loading, wait for it to finish loading
      return;
    }

    if (trip && trip.owner !== user.username) {
      getUserReservation();
    } else {
      setIsLoadingUserReservation(false);
      return;
    }
    // } else if (trip) {
    //   console.log("GET PASSENGERS");
    // }
    // getUserReservation();
  }, [tripId, user, trip]);

  return (
    <>
      {!loadingTrips && !loadingUserReservation ? (
        <Box>
          <TripCardDetails data={trip} reservation={userReservation} />
        </Box>
      ) : (
        <Box>Loading...</Box>
      )}
    </>
  );
};
