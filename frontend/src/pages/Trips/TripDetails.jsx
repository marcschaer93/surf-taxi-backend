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

export const TripDetails = () => {
  // use the show the error in async function (ERROR BOUNDARY LIMITATIONS)
  const { showBoundary } = useErrorBoundary();

  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [tripStatus, setTripStatus] = useState("");
  const FavoriteButton = styled(Button)(({ theme }) => ({}));

  const handleFavorite = (e) => {
    console.log("added to favorites. NOT IMPLEMENTED");
  };

  const handleJoinRequest = async (tripId) => {
    try {
      console.log("Request to join. NOT IMPLEMENTED");
      const newJoinRequest = await PassengerApi.requestToJoin(tripId);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const tripDetails = await TripApi.getOneTrip(tripId);
        console.log("tripDetails", tripDetails);
        if (!tripDetails) {
          toast.error("Trip not found. Please check the provided ID.");
          // redirect
        }

        setTrip(tripDetails);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        showBoundary(error);
        console.error("Error fetching trip:", error);
        // Handle error, e.g., redirect to an error page
      }
    };

    getData(); // Fetch the trip data when the component mounts
  }, [tripId]);

  return (
    <>
      {!loading ? (
        <Box>
          <TripCardDetails
            trip={trip}
            handleFavorite={handleFavorite}
            handleJoinRequest={handleJoinRequest}
          />
        </Box>
      ) : (
        <Box>Loading...</Box>
      )}
    </>
  );
};
