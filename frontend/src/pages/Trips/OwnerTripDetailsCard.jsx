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
import { GoBackButton } from "../../components/ui/GoBackButton";
import { useState } from "react";
import { TripCardContent } from "./TripCardContent";
import { BottomActionBar } from "../../components/BottomActionBar";

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
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const openDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  const closeDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  const handleGoBackButton = (e, tripId) => {
    e.stopPropagation();
    navigate(-1);
  };

  return (
    <>
      <Box>
        <GoBackButton handleGoBack={handleGoBackButton} />
        <Title variant="h3">My Organized Trip</Title>
        <TitleDivider />
      </Box>

      <StyledDetailsCard variant="outlined">
        <StatusChip isTripOwner={true} />

        <TripCardContent tripData={tripDetails} />

        <CardActions></CardActions>
        <Box>
          <DeleteOwnTripConfirmationCard
            tripDetails={tripDetails}
            handleConfirmDelete={handleConfirmDelete}
            handleGoBack={handleGoBack}
            open={showDeleteConfirmation}
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
            />
          ))
        ) : (
          <Typography variant="body1">No passengers</Typography>
        )}
      </Box>

      {/* Bottom action bar */}
      <BottomActionBar
        variant={"contained"}
        color={"error"}
        onClick={openDeleteConfirmation}
        buttonText={"Delete Trip"}
      />
    </>
  );
};
