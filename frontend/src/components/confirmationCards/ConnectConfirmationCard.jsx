import React from "react";
import { Confirmation } from "../../pages/Trips/Confirmation";
import { Box, Typography } from "@mui/material";
import { useMyTripsContext } from "../../context/MyTripsProvider";

export const ConnectConfirmationCard = ({
  reservation,
  open,
  onClose,
  tripDetails,
}) => {
  const { handleAction } = useMyTripsContext();

  const { originCity, destinationCity } = tripDetails;

  // Directly assign message and title based on the passenger reservation status
  const isRequested = reservation.status === "requested";
  const journeyDetails = `${originCity} to ${destinationCity}`;

  let message, title;

  if (isRequested) {
    message = `🚀 ${reservation.username} is interested in joining your trip from ${journeyDetails}. Would you like to connect and discuss further details?`;
    title = "New Join Request!";
  } else {
    message = `🎉 Ready to confirm ${reservation.username}'s seat for the trip from ${journeyDetails}? This will secure their spot and notify them of the update.`;
    title = `Confirm Seat for ${reservation.username}`;
  }

  const handleConfirm = async () => {
    const actionType = isRequested ? "connect" : "confirm";
    await handleAction(actionType, {
      reservationUsername: reservation.username,
      tripDetails,
    });
    onClose();
  };

  return (
    <Box>
      <Confirmation
        open={open}
        onClose={onClose}
        onConfirm={handleConfirm}
        message={message}
        title={title}
      />
    </Box>
  );
};
