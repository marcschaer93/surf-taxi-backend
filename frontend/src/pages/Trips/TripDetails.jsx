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

export const TripDetails = ({ myTrips, allTrips, setMyTrips, isInMyTrips }) => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [userStatus, setUserStatus] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { tripDetails, loadingDetails } = useTripDetails(parseInt(tripId));

  // const location = useLocation();
  // const { state } = location;
  // $$$$$$$
  // const tripDetails = state?.tripDetails;
  // const tripDetails = myTrips.find((t) => t.id === parseInt(tripId));

  // const tripNotifications = state?.tripNotifications;

  // trip passenger custom hook
  const { passengers, setPassengers, loadingPassengers } = useTripPassengers(
    tripId,
    user.username
  );

  useEffect(() => {
    const currentUserAsPassenger = passengers?.find(
      (p) => p.username === user.username
    );

    if (currentUserAsPassenger) {
      setUserStatus(currentUserAsPassenger.reservationStatus);
    }
  }, [passengers]);

  const handleConfirmJoin = async () => {
    try {
      setUserStatus("requested");
      const newJoinRequest = await PassengerApi.requestToJoin(tripId);
      setPassengers((prevPassengers) => [...prevPassengers, newJoinRequest]);
      setMyTrips((prevTrips) => [tripDetails, ...prevTrips]);
    } catch (error) {
      console.error();
    } finally {
      setShowConfirmation(false);
    }
  };

  const handleConfirmCancel = async () => {
    try {
      setUserStatus(null);
      await PassengerApi.cancelJoinRequest(tripId);
      setPassengers((prevPassengers) =>
        prevPassengers.filter(
          (passenger) => passenger.username !== user.username
        )
      );

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

  const handleConfirmDelete = async () => {
    try {
      await UserApi.deleteMyTrip(tripId, user.username);
      const myTripsData = await UserApi.getAllUserTrips(user.username);
      console.log("myTripsData", myTripsData);
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
      // setUserStatus("connecting");
      setUserStatus("pending");

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

      // Add trip to user's list of trips (if needed)
      // setMyTrips((prevTrips) => [tripDetails, ...prevTrips]);
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

  const isTripOwner = user.username === tripDetails?.owner;

  return (
    <>
      {loadingPassengers && <Box>Loading...</Box>}

      {tripDetails && isTripOwner && (
        <OwnerTripDetailsCard
          tripDetails={tripDetails}
          passengers={passengers}
          handleGoBack={handleGoBack}
          handleConfirmDelete={handleConfirmDelete}
          userStatus={userStatus}
          openConfirmation={openConfirmation}
          closeConfirmation={closeConfirmation}
          showConfirmation={showConfirmation}
          handleConfirmConnect={handleConfirmConnect}
        />
      )}

      {tripDetails && !isTripOwner && (
        <TripDetailsCard
          tripDetails={tripDetails}
          passengers={passengers}
          handleGoBack={handleGoBack}
          handleConfirmCancel={handleConfirmCancel}
          handleConfirmJoin={handleConfirmJoin}
          userStatus={userStatus}
          showConfirmation={showConfirmation}
          openConfirmation={openConfirmation}
        />
      )}
    </>
  );
};
