import { Confirmation } from "../../pages/Trips/Confirmation";
import { Box, CardActions, Button } from "@mui/material";

export const JoinRequestConfirmationCard = ({
  tripDetails,
  handleConfirmJoin,
  handleGoBack,
  open,
  onClose,
}) => {
  const message = `Are you sure you want to send a join request for the trip from ${tripDetails.startLocation} to ${tripDetails.destination}?`;

  const title = "Confirm Join Request";

  return (
    <Box>
      <Confirmation
        open={open}
        onClose={onClose}
        tripDetails={tripDetails}
        onConfirm={handleConfirmJoin}
        onCancel={handleGoBack}
        message={message}
        title={title}
      />
    </Box>
  );
};
