import React from "react";
import { Confirmation } from "../../pages/Trips/Confirmation";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";

export const ConnectConfirmationCard = ({
  passenger,
  open,
  onClose,
  tripDetails,
  handleAction,
}) => {
  const message = `You have a new join request for your trip from ${tripDetails.startLocation} to ${tripDetails.destination}. Do you want to confirm and get in touch with user ?`;

  const title = "Respond to Join Request.";

  console.log("PASSENGER CONNECT CARD $", passenger);

  const handleConfirm = async () => {
    await handleAction("connect", {
      passengerUsername: passenger.username,
      tripDetails,
    });
    onClose();
  };

  return (
    <Box>
      <Confirmation
        open={open}
        onClose={onClose}
        tripDetails={tripDetails}
        onConfirm={handleConfirm}
        message={message}
        title={title}
      />
    </Box>
  );
};
