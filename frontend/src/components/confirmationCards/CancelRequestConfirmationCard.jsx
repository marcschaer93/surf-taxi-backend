import { Confirmation } from "../../pages/Trips/Confirmation";
import { Box, CardActions, Button } from "@mui/material";

export const CancelRequestConfirmationCard = ({
  tripDetails,
  handleConfirmCancel,
  handleGoBack,
  open,
  onClose,
}) => {
  const message = `Are you sure you want to cancel your request for the trip from ${tripDetails.startLocation} to ${tripDetails.destination}?`;

  const title = "Confirm Cancel Request";

  return (
    <Confirmation
      open={open}
      onClose={onClose}
      tripDetails={tripDetails}
      onConfirm={handleConfirmCancel}
      onCancel={handleGoBack}
      message={message}
      title={title}
    />
  );
};
