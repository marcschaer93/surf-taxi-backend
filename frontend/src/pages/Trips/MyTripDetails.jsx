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
import { useTripDetails } from "../../hooks/useTripDetails";
import { useTripReservations } from "../../hooks/useTripReservations";
import ReservationApi from "../../../../backend/modules/reservations/reservationModel";

export const TripDetails = ({ myTrips, allTrips, setMyTrips, isInMyTrips }) => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [userReservation, setUserReservation] = useState(null);

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
  const { reservations, setReservations, loadingReservations } =
    useTripReservations(tripId, user.username);

  useEffect(() => {
    // change name ??
    const currentUserAsReservation = reservations?.find(
      (p) => p.username === user.username
    );

    if (currentUserAsReservation) {
      setUserReservation(currentUserAsReservation);
    }
  }, [reservations]);

  const handleConfirmJoin = async () => {
    try {
      setUserReservation((prev) => ({
        ...prev,
        status: "requested",
        reservationTimestamp: new Date().toISOString(),
      }));

      const newReservation = await ReservationApi.createNewReservation(tripId);
      setReservations((prevReservations) => [
        ...prevReservations,
        newReservation,
      ]);
      setMyTrips((prevTrips) => [tripDetails, ...prevTrips]);
    } catch (error) {
      console.error();
    } finally {
      setShowConfirmation(false);
    }
  };

  const handleConfirmCancel = async () => {
    try {
      setUserReservation(null);
      await ReservationApi.deleteOneReservation(tripId);
      setReservations((prevReservations) =>
        prevReservations.filter(
          (reservation) => reservation.username !== user.username
        )
      );

      const myTripsData = await UserApi.getAllUserTrips(user.username);
      setMyTrips(myTripsData);
      setReservations([]);
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

      setReservations([]);
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
      setUserReservation((prev) => ({
        ...prev,
        status: "pending",
        reservationTimestamp: new Date().toISOString(),
      }));

      // Send request to join the trip
      const updatedReservation = await ReservationApi.updateOneReservation(
        tripId,
        reservationUsername,
        "pending"
      );

      // Add new join request to the list of passengers
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation.username === reservationUsername
            ? {
                ...reservation,
                status: updatedReservation.status,
              }
            : reservation
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

  if (loadingReservations || loadingTripDetails) return <Box>Loading...</Box>;

  return (
    <>
      {isTripOwner && (
        <OwnerTripDetailsCard
          tripDetails={tripDetails}
          reservations={reservations}
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
          reservations={reservations}
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
