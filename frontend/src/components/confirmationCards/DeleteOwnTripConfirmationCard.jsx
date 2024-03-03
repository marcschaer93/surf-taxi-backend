import { Confirmation } from "../../pages/Trips/Confirmation";
import { Box, CardActions, Button } from "@mui/material";
import { useMyTripsContext } from "../../context/MyTripsProvider";

export const DeleteOwnTripConfirmationCard = ({
  tripDetails,
  open,
  onClose,
}) => {
  const { handleAction } = useMyTripsContext();

  const { originCity, destinationCity } = tripDetails;

  const message = `Are you sure you want to delete your trip from ${originCity} to ${destinationCity}?`;

  const title = "Confirm Delete Trip";

  const handleConfirm = async () => {
    await handleAction("delete", { tripDetails });
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
