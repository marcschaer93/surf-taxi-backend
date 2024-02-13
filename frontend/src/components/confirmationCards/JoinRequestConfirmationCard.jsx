import { Confirmation } from "../../pages/Trips/Confirmation";
import { Box, CardActions, Button } from "@mui/material";
import { useMyTrips } from "../../context/MyTripsProvider";

export const JoinRequestConfirmationCard = ({
  tripDetails,
  open,
  onClose,
  // handleAction,
}) => {
  const { handleAction } = useMyTrips();

  const message = `Are you sure you want to send a join request for the trip from ${tripDetails.startLocation} to ${tripDetails.destination}?`;

  const title = "Confirm Join Request";

  const handleConfirm = async () => {
    await handleAction("join", { tripDetails });
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
