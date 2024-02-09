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

export const MyTrips = ({ myTrips, allTrips, notifications }) => {
  const { user } = useAuthContext();
  const { showBoundary } = useErrorBoundary();
  const navigate = useNavigate();

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
            tripData={trip}
            isInMyTrips={true}
            isTripOwner={trip.owner === user?.username}
            // tripNotifications={notifications.filter(
            //   (n) => n.tripId === trip.id
            // )}
          />
        ))}
      </Box>
    </>
  );
};
