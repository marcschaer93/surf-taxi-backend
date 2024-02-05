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
import { ResponseConfirmationCard } from "../../components/confirmationCards/ResponseConfirmationCard";

export const PassengerCard = ({
  tripDetails,
  passengerNotification,
  passenger,
  openConfirmation,
  showConfirmation,
  closeConfirmation,
}) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleConfirmRequest = () => {
    console.log("Confirm Request. NOT IMPLEMENTED");
  };

  const handleRejectRequest = () => {
    console.log("Reject Request. NOT IMPLEMENTED");
  };

  console.log("passengerNotify", passengerNotification);
  console.log("passenger", passenger);

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
                  ? "success"
                  : passenger.reservationStatus === "pending"
                  ? "warning"
                  : passenger.reservationStatus === "rejected"
                  ? "error"
                  : "default"
              }
            />
          </Box>
        </CardContent>

        <CardActions>
          <Button variant="outlined" size="small" onClick={openConfirmation}>
            Response
          </Button>
        </CardActions>
        <ResponseConfirmationCard
          tripDetails={tripDetails}
          //   handleConfirmResponse={handleConfirmResponse}
          //   handleGoBack={handleGoBack}
          handleConfirmRequest={handleConfirmRequest}
          handleRejectRequest={handleRejectRequest}
          open={showConfirmation}
          onClose={closeConfirmation}
        />
      </StyledPreviewCard>
    </>
  );
};
