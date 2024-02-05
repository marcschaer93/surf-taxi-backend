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

export const ResponseConfirmationCard = ({
  handleConfirmRequest,
  handleRejectRequest,
  handleReject,
  open,
  onClose,
  tripDetails,
}) => {
  const message = `You have a new join request for your trip from ${tripDetails.startLocation} to ${tripDetails.destination}. Do you want to confirm or reject this request?`;

  const title = "Respond to Join Request";

  return (
    <Box>
      <Confirmation
        open={open}
        onClose={onClose}
        tripDetails={tripDetails}
        onConfirm={handleConfirmRequest}
        onCancel={handleRejectRequest}
        message={message}
        title={title}
      />
    </Box>
  );
};
