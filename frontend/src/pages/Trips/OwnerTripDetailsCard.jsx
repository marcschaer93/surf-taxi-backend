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
// import { CardStatusChip } from "../../components/ui/CardStatusChip";
import { useNavigate } from "react-router-dom";
import { CancelRequestConfirmationCard } from "../../components/confirmationCards/CancelRequestConfirmationCard";
import { JoinRequestConfirmationCard } from "../../components/confirmationCards/JoinRequestConfirmationCard";
import { DeleteOwnTripConfirmationCard } from "../../components/confirmationCards/DeleteOwnTripConfirmationCard";
import { StyledDetailsCard } from "../../styles/cardStyles";
import { PassengerCard } from "./PassengerCard";
import { Title, TitleDivider } from "../../styles/fontStyles";
import { GoBackButton } from "../../components/ui/GoBackButton";
import { useState } from "react";
import { TripCardContent } from "./TripCardContent";
import { BottomActionBar } from "../../components/BottomActionBar";
import { PassengerAvatars } from "../../components/ui/PassengerAvatars";
import { StatusChip } from "../../components/ui/StatusChip";

export const OwnerTripDetailsCard = ({
  tripDetails,
  passengers,
  handleAction,
}) => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const openConfirmation = () => setShowConfirmation(true);
  const closeConfirmation = () => setShowConfirmation(false);
  const handleGoBackButton = (e, tripId) => {
    e.stopPropagation();
    navigate(-1);
  };

  const notConfirmedPassengers = passengers.filter(
    (p) => p.reservationStatus !== "confirmed"
  );

  return (
    <>
      <Box sx={{ marginBottom: "80px" }}>
        <Box>
          <GoBackButton handleGoBack={handleGoBackButton} />
          <Title variant="h3">My Organized Trip</Title>
          <TitleDivider />
        </Box>

        <StyledDetailsCard variant="outlined">
          <Box sx={{ position: "absolute", top: 18, right: 18 }}>
            <StatusChip status={"organizer"} />
          </Box>

          <TripCardContent tripDetails={tripDetails} />

          <Box>
            {showConfirmation && (
              <DeleteOwnTripConfirmationCard
                tripDetails={tripDetails}
                open={showConfirmation}
                onClose={closeConfirmation}
                handleAction={handleAction}
              />
            )}
          </Box>
        </StyledDetailsCard>

        {/* Requests */}
        <Box>
          <Typography variant="h5">My Requests</Typography>
          {notConfirmedPassengers && notConfirmedPassengers.length > 0 ? (
            notConfirmedPassengers.map((p) => (
              <PassengerCard
                key={`${p.username} + ${p.trip_id}`}
                tripDetails={tripDetails}
                passenger={p}
                handleAction={handleAction}
              />
            ))
          ) : (
            <Typography variant="body2">No further requests </Typography>
          )}
        </Box>

        {/* Passengers */}
        <Box>
          <TitleDivider />
          <Typography variant="h5">Reserved Seats</Typography>
          <PassengerAvatars passengers={passengers} />
        </Box>

        <TitleDivider />
        <Box>
          <Button
            variant={"text"}
            size="small"
            onClick={openConfirmation}
            color="error"
          >
            Delete Trip
          </Button>
        </Box>

        {/* Bottom action bar */}
        {/* <BottomActionBar
          variant={"contained"}
          color={"error"}
          onClick={openDeleteConfirmation}
          buttonText={"Delete Trip"}
        /> */}
      </Box>
    </>
  );
};
