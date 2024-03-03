import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  ListItemIcon,
  Box,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

export const StatusInfoDialog = ({ open, onClose, currentStatus }) => {
  const statusDescriptions = {
    requested: {
      description:
        "You've requested to join this trip. The trip organizer will be notified of your request.",
      nextSteps:
        "Please wait for the organizer to review your request. You'll be notified once there's an update.",
    },
    pending: {
      description:
        "You're in touch! The organizer has received your request and is considering it.",
      nextSteps:
        "Keep an eye on your notifications for any updates from the organizer.",
    },
    confirmed: {
      description:
        "Seat secured! Your spot on this trip is confirmed. Get ready for the adventure!",
      nextSteps:
        "Start preparing for your trip. Make sure to communicate with the organizer for any details.",
    },
    rejected: {
      description:
        "Request declined. Unfortunately, your spot on this trip could not be confirmed.",
      nextSteps:
        "Don't get discouraged! There are plenty more trips waiting for you. Keep exploring and send more join requests.",
    },
  };

  const statusInfo = statusDescriptions[currentStatus];

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Status Information</DialogTitle>
      <DialogContent>
        <Box display="flex" alignItems="center" gap={2}>
          <Box>
            <Typography>{statusInfo.description}</Typography>
            <Typography variant="body2" style={{ marginTop: "8px" }}>
              <strong>What's Next:</strong> {statusInfo.nextSteps}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button startIcon={<CancelIcon />} onClick={onClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
