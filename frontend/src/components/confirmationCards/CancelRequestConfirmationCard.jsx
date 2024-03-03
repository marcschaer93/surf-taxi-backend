import { Confirmation } from "../../pages/Trips/Confirmation";
import { Box, CardActions, Button } from "@mui/material";
import { useMyTripsContext } from "../../context/MyTripsProvider";

export const CancelRequestConfirmationCard = ({
  tripDetails,
  open,
  onClose,
}) => {
  const { handleAction } = useMyTripsContext();

  const { originCity, destinationCity } = tripDetails;

  const message = `Are you sure you want to cancel your request for the trip from ${originCity} to ${destinationCity}?`;

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
