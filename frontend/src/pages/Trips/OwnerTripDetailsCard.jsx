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
import { PassengerCard } from "./PassengerCard";
import { Title, TitleDivider } from "../../styles/fontStyles";

export const OwnerTripDetailsCard = ({
  tripDetails,
  passengers,
  handleGoBack,
  handleConfirmDelete,
  showConfirmation,
  openConfirmation,
  closeConfirmation,
  handleConfirmConnect,
  // tripNotifications,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <Title variant="h3">My Organized Trip</Title>
      <TitleDivider />

      <StyledDetailsCard variant="outlined">
        <StatusChip isTripOwner={true} />
        <CardContent>
          <Typography variant="h6">Trip Details</Typography>
          <Typography variant="body1" gutterBottom>
            Start Location: {tripDetails.startLocation}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Destination: {tripDetails.destination}
          </Typography>

          <Typography color="text.secondary">
            Stops: {tripDetails.stops}
          </Typography>

          <Typography variant="h6">Passengers</Typography>
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
      <Box>
        <Typography variant="h5">My Passengers</Typography>

        {passengers && passengers.length > 0 ? (
          passengers.map((p) => (
            <PassengerCard
              key={`${p.username} + ${p.trip_id}`}
              tripDetails={tripDetails}
              openConfirmation={openConfirmation}
              showConfirmation={showConfirmation}
              closeConfirmation={closeConfirmation}
              passenger={p}
              handleGoBack={handleGoBack}
              handleConfirmConnect={handleConfirmConnect}
              // passengerNotification={tripNotifications.filter(
              //   (n) => p.username === n.senderUsername
              // )}
            />
          ))
        ) : (
          <Typography>No Passengers</Typography>
        )}
      </Box>
    </>
  );
};
