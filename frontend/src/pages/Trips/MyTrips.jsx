import { Box, Typography, styled, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

import { TripPreviewCard } from "./TripPreviewCard";
import { useAuthContext } from "../../context/authProvider";
import * as UserApi from "../../api/services/UserApi";
import { useNotifications } from "../../hooks/useNotifications";
import { Title, TitleDivider } from "../../styles/fontStyles";
import { theme } from "../../utils/theme";
import SurfingSharpIcon from "@mui/icons-material/SurfingSharp";
import { useMyReservations } from "../../hooks/useMyReservations";

export const MyTrips = ({ myTrips }) => {
  const { user } = useAuthContext();
  const { showBoundary } = useErrorBoundary();
  const navigate = useNavigate();

  const { myReservations, setMyReservations, loadingMyReservations } =
    useMyReservations();

  if (loadingMyReservations) return <Box>Loading./..</Box>;

  const filterMyReservation = (tripId) => {
    const myReservation = myReservations?.find(
      (reservation) => reservation.tripId === tripId
    );
    return myReservation;
  };

  const handleCardClick = (tripId) => {
    // navigate(`/my-trips/${tripId}`, {
    //   state: { myReservation },
    // });
    navigate(`/my-trips/${tripId}`);
  };

  return (
    <>
      <Box>
        <Title variant="h3">My Trips</Title>
        <TitleDivider />
      </Box>

      {myTrips.length === 0 && (
        <Box sx={{ textAlign: "center", mt: "80px", p: "25px" }}>
          <SurfingSharpIcon
            sx={{ fontSize: "3rem", color: theme.palette.text.secondary }}
          />
          <Typography variant="h6">
            No trips in myTrips available now
          </Typography>
          <Typography color="text.secondary">
            Add a new Trip or join another!
          </Typography>
        </Box>
      )}
      {""}
      <Box sx={{ marginBottom: "80px" }}>
        {myTrips.map((trip) => (
          <TripPreviewCard
            key={trip.id}
            tripDetails={trip}
            handleCardClick={handleCardClick}
            isInMyTrips={true}
            isTripOwner={trip.owner === user.username}
            myReservation={filterMyReservation(trip.id)}
          />
        ))}
      </Box>
    </>
  );
};
