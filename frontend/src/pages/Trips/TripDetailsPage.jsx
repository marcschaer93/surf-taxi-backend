import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

import { useAuthContext } from "../../context/authProvider";
import * as PassengerApi from "../../api/services/ReservationApi";
import * as TripApi from "../../api/services/TripApi";
import * as UserApi from "../../api/services/UserApi";
import { TripDetailsCard } from "./TripDetailsCard";
import { OwnerTripDetailsCard } from "./OwnerTripDetailsCard";
import { useFetchTripReservations } from "../../hooks/useFetchTripReservations";
import { useFetchTripDetails } from "../../hooks/useFetchTripDetails";
import { useMyTrips } from "../../context/MyTripsProvider";
import { Loading } from "../../components/ui/Loading";

// DATA FLOW
// tripDetails      ===>     state ? tripDetails : API Call
// tripPassengers   ===>     API Call
// userReservation  ===>     dependend on tripPassengers

const TripDetailsPage = ({ allTrips }) => {
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
  // const [userReservation, setUserReservation] = useState(null);
  const [loadingAction, setLoadingAction] = useState(false);

  const {
    fetchReservationsForTrip,
    reservations,
    handleAction,
    loadingReservations,
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

  useEffect(() => {
    // Fetch passengers when the component mounts or tripId changes
    fetchReservationsForTrip(tripId);
  }, [fetchReservationsForTrip, tripId]);

  // const [userReservation, setUserReservation] = useState(null);

  // useEffect(() => {
  //   if (!isTripOrganizer) {
  //     const currentUserAsPassenger = passengers?.find(
  //       (p) => p.username === user.username
  //     );

  //     if (currentUserAsPassenger) {
  //       setUserReservation(currentUserAsPassenger);
  //     }
  //   }
  // }, [passengers, user]);

  if (loadingTripDetails || loadingReservations || loadingAction)
    return <Loading />;

  return (
    <>
      {isTripOrganizer ? (
        <OwnerTripDetailsCard
          tripDetails={tripDetails}
          reservations={reservations}
          handleAction={handleAction}
        />
      ) : (
        <TripDetailsCard
          tripDetails={tripDetails}
          reservations={reservations}
          handleAction={handleAction}
        />
      )}
    </>
  );
};

export default TripDetailsPage;
