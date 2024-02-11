import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
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

// DATA FLOW
// tripDetails      ===>     state ? tripDetails : API Call
// tripPassengers   ===>     API Call
// userReservation  ===>     dependend on tripPassengers

export const TripDetails = ({ myTrips, allTrips, setMyTrips, isInMyTrips }) => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const location = useLocation();
  const { state } = location;
  const tripDetailsFromState = state?.tripDetails;
  const [tripDetails, setTripDetails] = useState(tripDetailsFromState);
  const [loadingTripDetails, setLoadingTripDetails] = useState(
    !tripDetailsFromState
  );

  const [userReservation, setUserReservation] = useState(null);

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
  const {
    passengers,
    setPassengers,
    loading: loadingPassengers,
  } = useTripPassengers(tripId, user.username);

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

  // handle join request
  const handleConfirmJoin = async () => {
    try {
      const newJoinRequest = await PassengerApi.requestToJoin(tripId);
      setPassengers((prevPassengers) => [...prevPassengers, newJoinRequest]);
      setMyTrips((prevTrips) => [tripDetails, ...prevTrips]);
    } catch (error) {
      console.error("Error confirming join:", error);
    } finally {
      setShowConfirmation(false);
    }
  };

  // handle join cancel
  const handleConfirmCancel = async () => {
    try {
      await PassengerApi.cancelJoinRequest(tripId);
      setPassengers((prevPassengers) =>
        prevPassengers.filter(
          (passenger) => passenger.username !== user.username
        )
      );

      const myTripsData = await UserApi.getAllUserTrips(user.username);
      setMyTrips(myTripsData);
      navigate("/my-trips");
    } catch (error) {
      console.error(error);
    } finally {
      setShowConfirmation(false);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await UserApi.deleteMyTrip(tripId, user.username);
      const myTripsData = await UserApi.getAllUserTrips(user.username);
      setMyTrips(myTripsData);

      setPassengers([]);
      navigate("/my-trips");
    } catch (error) {
      console.error(error);
    } finally {
      setShowConfirmation(false);
    }
  };

  const handleConfirmConnect = async (passengerUsername) => {
    try {
      // Update user status to indicate pending connection
      // setUserPassenger((prev) => ({
      //   ...prev,
      //   reservationStatus: "pending",
      //   reservationTimestamp: new Date().toISOString(),
      // }));

      // Send request to join the trip
      const updatedPassenger = await PassengerApi.updatePassengerStatus(
        tripId,
        passengerUsername,
        "pending"
      );

      // Add new join request to the list of passengers
      setPassengers((prevPassengers) =>
        prevPassengers.map((passenger) =>
          passenger.username === passengerUsername
            ? {
                ...passenger,
                reservationStatus: updatedPassenger.reservationStatus,
              }
            : passenger
        )
      );
    } catch (error) {
      console.error("Error confirming connection:", error);
    } finally {
      // Hide the confirmation dialog regardless of success or failure
      setShowConfirmation(false);
    }
  };

  const handleGoBack = () => {
    setShowConfirmation(false);
  };

  const openConfirmation = () => {
    setShowConfirmation(true);
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
  };

  if (loadingPassengers || !tripDetails) return <Box>Loading...</Box>;

  return (
    <>
      {isTripOrganizer && (
        <OwnerTripDetailsCard
          tripDetails={tripDetails}
          passengers={passengers}
          handleGoBack={handleGoBack}
          handleConfirmDelete={handleConfirmDelete}
          openConfirmation={openConfirmation}
          closeConfirmation={closeConfirmation}
          showConfirmation={showConfirmation}
          handleConfirmConnect={handleConfirmConnect}
        />
      )}

      {!isTripOrganizer && (
        <TripDetailsCard
          tripDetails={tripDetails}
          passengers={passengers}
          handleGoBack={handleGoBack}
          handleConfirmCancel={handleConfirmCancel}
          handleConfirmJoin={handleConfirmJoin}
          userReservation={userReservation}
          showConfirmation={showConfirmation}
          openConfirmation={openConfirmation}
        />
      )}
    </>
  );
};
