import { Confirmation } from "./Confirmation";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  styled,
  Paper,
  Chip,
} from "@mui/material";
import { theme } from "../../utils/theme";
import { StatusChip } from "../../components/ui/StatusChip";

const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative",
  borderWidth: "0.5px",
  cursor: "pointer",
  transition: "background 0.3s ease",
  margin: "20px 0", // Add margin to create space between cards
  width: "100%",

  "&:hover": {
    background: theme.palette.action.hover,
  },
}));

export const OwnerTripDetailsCard = ({
  tripDetails,
  passengers,
  isTripOwner,
  handleGoBack,
  handleConfirmCancel,
  handleBack,
  handleConfirmJoin,
  userStatus,
  handleJoinTrip,
  showConfirmation,
}) => {
  console.log("PASSENGERS", passengers);
  return (
    <>
      <StyledCard
        variant="outlined"
        sx={{
          borderColor: isTripOwner
            ? theme.palette.contrast.main
            : theme.palette.grey[800],
        }}
      >
        <StatusChip isTripOwner={isTripOwner} />;
        <CardContent>
          <Typography variant="h4">Trip Details</Typography>
          <Typography variant="body1" gutterBottom>
            Start Location: {tripDetails.startLocation}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Destination: {tripDetails.destination}
          </Typography>

          <Typography color="text.secondary">
            Stops: {tripDetails.stops}
          </Typography>

          <Typography variant="h5">Passengers</Typography>

          <Box>
            {passengers && passengers.length > 0 ? (
              passengers.map((p) => (
                <Box
                  key={p.username + p.trip_id}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography>{p.username}</Typography>
                  <Typography>Status: {p.reservationStatus}</Typography>
                </Box>
              ))
            ) : (
              <Typography>No Passengers</Typography>
            )}
          </Box>
        </CardContent>
        <CardActions>
          {!isTripOwner && (
            <>
              {userStatus ? (
                <Button onClick={handleJoinTrip}>Cancel Trip</Button>
              ) : (
                <Button onClick={handleJoinTrip}>Join Trip</Button>
              )}

              {showConfirmation && (
                <Confirmation
                  tripDetails={tripDetails}
                  onConfirm={handleConfirmJoin}
                  onCancel={handleConfirmCancel}
                  onGoBack={handleGoBack}
                  userStatus={userStatus}
                />
              )}
            </>
          )}

          <Button size="small" onClick={handleBack} variant="outlined">
            Go Back
          </Button>
        </CardActions>
      </StyledCard>
    </>
  );
};
