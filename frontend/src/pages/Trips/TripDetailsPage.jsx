import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useLocation } from "react-router-dom";

import { useAuthContext } from "../../context/authProvider";
import * as PassengerApi from "../../api/services/PassengerApi";
import * as TripApi from "../../api/services/TripApi";
import * as UserApi from "../../api/services/UserApi";
import { TripDetailsCard } from "./TripDetailsCard";
import { OwnerTripDetailsCard } from "./OwnerTripDetailsCard";
import { useTripPassengers } from "../../hooks/useTripPassengers";
import { useTripDetails } from "../../hooks/useTripDetails";
import { useUserReservation } from "../../hooks/useUserReservation";
import { useMyTrips } from "../../context/MyTripsProvider";

// DATA FLOW
// tripDetails      ===>     state ? tripDetails : API Call
// tripPassengers   ===>     API Call
// userReservation  ===>     dependend on tripPassengers

const TripDetailsPage = ({ allTrips, isInMyTrips }) => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const location = useLocation();
  const { state } = location;
  const tripDetailsFromState = state?.tripDetails;
  const [tripDetails, setTripDetails] = useState(tripDetailsFromState);
  const [loadingTripDetails, setLoadingTripDetails] = useState(
    !tripDetailsFromState
  );
  const [userReservation, setUserReservation] = useState(null);
  const [loadingAction, setLoadingAction] = useState(false);

  const {
    fetchPassengersForTrip,
    passengers,
    handleAction,
    loadingPassengers,
  } = useMyTrips();

  useEffect(() => {
    if (!tripDetailsFromState) {
      const fetchTripDetails = async () => {
        try {
          const tripDetailsData = await TripApi.getOneTrip(tripId);
          setTripDetails(tripDetailsData);
        } catch (error) {
          console.error(error);
        } finally {
          setLoadingTripDetails(false);
        }
      };
      fetchTripDetails();
    }
  }, [tripId, tripDetailsFromState]);

  // Check if user is trip Organizer
  const isTripOrganizer = user.username === tripDetails?.owner;

  // Get all Passengers for trip
  // const {
  //   passengers,
  //   setPassengers,
  //   loading: loadingPassengers,
  // } = useTripPassengers(tripId, user.username);

  useEffect(() => {
    // Fetch passengers when the component mounts or tripId changes
    fetchPassengersForTrip(tripId);
  }, [fetchPassengersForTrip, tripId]);

  useEffect(() => {
    if (!isTripOrganizer) {
      const currentUserAsPassenger = passengers?.find(
        (p) => p.username === user.username
      );

      if (currentUserAsPassenger) {
        setUserReservation(currentUserAsPassenger);
      }
    }
  }, [passengers, user]);

  // const handleAction = useHandleAction(
  //   tripId,
  //   setPassengers,
  //   setLoadingAction,
  //   setMyTrips
  // );

  if (loadingTripDetails || loadingPassengers || loadingAction)
    return <CircularProgress />;

  return (
    <>
      {isTripOrganizer ? (
        <OwnerTripDetailsCard
          tripDetails={tripDetails}
          passengers={passengers}
          handleAction={handleAction}
        />
      ) : (
        <TripDetailsCard
          tripDetails={tripDetails}
          passengers={passengers}
          handleAction={handleAction}
          userReservation={userReservation}
        />
      )}
    </>
  );
};

export default TripDetailsPage;
