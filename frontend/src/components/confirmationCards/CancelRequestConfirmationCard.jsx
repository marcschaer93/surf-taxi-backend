import { Confirmation } from "../../pages/Trips/Confirmation";
import { Box, CardActions, Button } from "@mui/material";
import { useMyTripsContext } from "../../context/MyTripsProvider";

export const CancelRequestConfirmationCard = ({
  tripDetails,
  // handleConfirmCancel,
  open,
  onClose,
  // handleAction,
}) => {
  const { handleAction } = useMyTripsContext();
  const message = `Are you sure you want to cancel your request for the trip from ${tripDetails.startLocation} to ${tripDetails.destination}?`;

  const title = "Confirm Cancel Request";

  const handleConfirm = async () => {
    await handleAction("cancel", { tripDetails });
    onClose();
  };

  return (
    <Confirmation
      open={open}
      onClose={onClose}
      tripDetails={tripDetails}
      onConfirm={handleConfirm}
      message={message}
      title={title}
    />
  );
};
