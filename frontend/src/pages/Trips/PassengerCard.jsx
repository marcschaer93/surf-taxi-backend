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
import { useState } from "react";

import { useAuthContext } from "../../context/authProvider";
import { theme } from "../../utils/theme";
import { StyledPreviewCard } from "../../styles/cardStyles";
import { FavoriteButton } from "../../styles/buttonStyles";
import { useTripDetails } from "../../hooks/useTripDetails";
import { useFavorite } from "../../hooks/useFavorite";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ConnectConfirmationCard } from "../../components/confirmationCards/ConnectConfirmationCard";
import { ColorAvatar } from "../../components/ui/ColorAvatar";
import { StatusChip } from "../../components/ui/StatusChip";

export const PassengerCard = ({
  tripDetails,
  passengerNotification,
  reservation,

  handleGoBack,
  handleConfirmConnect,
  handleAction,
}) => {
  console.log("passenegercard name", reservation.username);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const openConfirmation = () => {
    setShowConfirmation(true);
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
  };

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
            key={reservation.username + reservation.trip_id}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <ColorAvatar username={reservation.username} />

            <StatusChip status={reservation.status} />
          </Box>
        </CardContent>

        <CardActions sx={{ display: "flex", justifyContent: "left" }}>
          {/* Connect Button */}
          {reservation.status === "requested" && (
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={openConfirmation}
            >
              CONNECT
            </Button>
          )}
          {/* Confirm Button */}
          {reservation.status === "pending" && (
            <Button variant="contained" size="small" onClick={openConfirmation}>
              Confirm Seat
            </Button>
          )}
        </CardActions>

        {showConfirmation && (
          <ConnectConfirmationCard
            tripDetails={tripDetails}
            reservation={reservation}
            open={showConfirmation}
            onClose={closeConfirmation}
            handleAction={handleAction}
          />
        )}
      </StyledPreviewCard>
    </>
  );
};
