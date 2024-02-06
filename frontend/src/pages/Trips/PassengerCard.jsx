import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  styled,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";

import { useAuthContext } from "../../context/authProvider";
import { theme } from "../../utils/theme";
import { StatusChip } from "../../components/ui/StatusChip";
import { StyledPreviewCard } from "../../styles/cardStyles";
import { FavoriteButton } from "../../styles/buttonStyles";
import { useTripDetails } from "../../hooks/useTripDetails";
import { useFavorite } from "../../hooks/useFavorite";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ConnectConfirmationCard } from "../../components/confirmationCards/ConnectConfirmationCard";

export const PassengerCard = ({
  tripDetails,
  passengerNotification,
  passenger,
  openConfirmation,
  showConfirmation,
  closeConfirmation,
  handleGoBack,
  handleConfirmConnect,
}) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  //   const handleConfirmConnect = () => {
  //     console.log("Confirm Request. NOT IMPLEMENTED");
  //   };

  // trip details custom hook
  const isTripOwner = user && tripDetails?.owner === user.username;

  return (
    <>
      <StyledPreviewCard
        variant="outlined"
        sx={{
          borderColor: isTripOwner
            ? theme.palette.contrast.main
            : theme.palette.grey[800],
        }}
      >
        {passengerNotification && passengerNotification.length > 0 && (
          <Chip
            label="New"
            size="small"
            color="success"
            sx={{ position: "absolute", top: 5, right: 5 }}
          />
        )}

        <CardContent>
          <Box
            key={passenger.username + passenger.trip_id}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography>{passenger.username}</Typography>

            <Chip
              label={passenger.reservationStatus}
              color={
                passenger.reservationStatus === "confirmed"
                  ? "success" // Green for confirmed
                  : passenger.reservationStatus === "pending"
                  ? "info" // Blue or another soft color for pending
                  : passenger.reservationStatus === "rejected"
                  ? "error" // Red for rejected
                  : passenger.reservationStatus === "requested"
                  ? "warning" // Yellow or orange for requested
                  : "default" // Use default color for other cases
              }
            />
          </Box>
        </CardContent>

        <CardActions>
          {passenger.reservationStatus === "requested" && (
            <Button variant="outlined" size="small" onClick={openConfirmation}>
              Connect
            </Button>
          )}
        </CardActions>
        <ConnectConfirmationCard
          tripDetails={tripDetails}
          passenger={passenger}
          handleGoBack={handleGoBack}
          handleConfirmConnect={handleConfirmConnect}
          open={showConfirmation}
          onClose={closeConfirmation}
        />
      </StyledPreviewCard>
    </>
  );
};
