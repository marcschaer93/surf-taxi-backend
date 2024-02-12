import { Confirmation } from "../../pages/Trips/Confirmation";
import { Box, CardActions, Button } from "@mui/material";

export const DeleteOwnTripConfirmationCard = ({
  tripDetails,
  handleConfirmDelete,
  open,
  onClose,
}) => {
  const message = `Are you sure you want to delete your trip from ${tripDetails.startLocation} to ${tripDetails.destination}?`;

  const title = "Confirm Delete Trip";

  return (
    <Box>
      <Confirmation
        open={open}
        onClose={onClose}
        tripDetails={tripDetails}
        onConfirm={handleConfirmDelete}
        message={message}
        title={title}
      />
    </Box>
  );
};
