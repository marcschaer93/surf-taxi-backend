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
  handleConfirmConnect,
  passenger,
  open,
  onClose,
  tripDetails,
  handleGoBack,
}) => {
  const message = `You have a new join request for your trip from ${tripDetails.startLocation} to ${tripDetails.destination}. Do you want to confirm and get in touch with user ?`;

  const title = "Respond to Join Request.";

  return (
    <Box>
      <Confirmation
        open={open}
        onClose={onClose}
        tripDetails={tripDetails}
        onConfirm={() => handleConfirmConnect(passenger.username)}
        onCancel={handleGoBack}
        message={message}
        title={title}
      />
    </Box>
  );
};
