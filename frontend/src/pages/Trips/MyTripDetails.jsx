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

export const MyTripDetails = ({
  myTrips,
  allTrips,
  setMyTrips,
  isInMyTrips,
}) => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [userPassenger, setUserPassenger] = useState(null);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const { tripDetails, loadingTripDetails } = useTripDetails(parseInt(tripId));
  const [isTripOwner, setIsTripOwner] = useState(false);

  console.log("LOADING TRIP", loadingTripDetails);

  useEffect(() => {
    setIsTripOwner(user.username === tripDetails?.owner);
  }, [tripDetails]);

  // $$$
  // const location = useLocation();
  // const { state } = location;
  // const isTripOwner = state?.isTripOwner || false;
  // $$$

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
      setUserPassenger(currentUserAsPassenger);
    }
  }, [passengers]);

  const handleConfirmJoin = async () => {
    try {
      setUserPassenger((prev) => ({
        ...prev,
        reservationStatus: "requested",
        reservationTimestamp: new Date().toISOString(),
      }));

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
      setUserPassenger(null);
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
      setUserPassenger((prev) => ({
        ...prev,
        reservationStatus: "pending",
        reservationTimestamp: new Date().toISOString(),
      }));

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

  if (loadingPassengers || loadingTripDetails) return <Box>Loading...</Box>;

  return (
    <>
      {isTripOwner && (
        <OwnerTripDetailsCard
          tripDetails={tripDetails}
          passengers={passengers}
          handleGoBack={handleGoBack}
          handleConfirmDelete={handleConfirmDelete}
          // userPassenger={userPassenger}
          openConfirmation={openConfirmation}
          closeConfirmation={closeConfirmation}
          showConfirmation={showConfirmation}
          handleConfirmConnect={handleConfirmConnect}
        />
      )}

      {!isTripOwner && (
        <TripDetailsCard
          tripDetails={tripDetails}
          passengers={passengers}
          handleGoBack={handleGoBack}
          handleConfirmCancel={handleConfirmCancel}
          handleConfirmJoin={handleConfirmJoin}
          userPassenger={userPassenger}
          showConfirmation={showConfirmation}
          openConfirmation={openConfirmation}
        />
      )}
    </>
  );
};
