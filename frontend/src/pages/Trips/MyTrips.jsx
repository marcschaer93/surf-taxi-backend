import { Box, Typography, styled, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

import { TripPreviewCard } from "./TripPreviewCard";
import { useAuthContext } from "../../context/authProvider";
import * as UserApi from "../../api/services/UserApi";
import { useNotifications } from "../../hooks/useNotifications";
import { Title, TitleDivider } from "../../styles/fontStyles";

export const MyTrips = ({ myTrips, allTrips, notifications }) => {
  const { user } = useAuthContext();
  const { showBoundary } = useErrorBoundary();
  const navigate = useNavigate();

  if (!myTrips) return <Box>No Trips available</Box>;

  return (
    <>
      <Title variant="h3">My Trips</Title>
      <TitleDivider />
      {myTrips.length === 0 && (
        <Box sx={{ textAlign: "left", ml: "30px" }}>
          <Typography variant="h5">
            No trips available in My Trips...
          </Typography>
          <Typography color="text.secondary">Join or Create a trip</Typography>
        </Box>
      )}
      {""}
      <Box>
        {myTrips.map((trip) => (
          <TripPreviewCard
            key={trip.id}
            tripData={trip}
            isInMyTrips={true}
            tripNotifications={notifications.filter(
              (n) => n.tripId === trip.id
            )}
          />
        ))}
      </Box>
    </>
  );
};
