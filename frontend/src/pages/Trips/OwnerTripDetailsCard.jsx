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
import { useNavigate } from "react-router-dom";
import { CancelRequestConfirmationCard } from "../../components/confirmationCards/CancelRequestConfirmationCard";
import { JoinRequestConfirmationCard } from "../../components/confirmationCards/JoinRequestConfirmationCard";
import { DeleteOwnTripConfirmationCard } from "../../components/confirmationCards/DeleteOwnTripConfirmationCard";
import { StyledDetailsCard } from "../../styles/cardStyles";

export const OwnerTripDetailsCard = ({
  tripDetails,
  passengers,
  handleGoBack,
  handleConfirmDelete,
  showConfirmation,
  openConfirmation,
  closeConfirmation,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <StyledDetailsCard variant="outlined">
        <StatusChip isTripOwner={true} />
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
          <Button onClick={openConfirmation}>Delete Trip</Button>
          <Button size="small" onClick={() => navigate(-1)} variant="outlined">
            Go Back
          </Button>
        </CardActions>
        <Box>
          <DeleteOwnTripConfirmationCard
            tripDetails={tripDetails}
            handleConfirmDelete={handleConfirmDelete}
            handleGoBack={handleGoBack}
            open={showConfirmation}
            onClose={closeConfirmation}
          />
        </Box>
      </StyledDetailsCard>
    </>
  );
};
