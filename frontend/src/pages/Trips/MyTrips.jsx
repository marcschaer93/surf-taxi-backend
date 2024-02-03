import { Box, Typography, styled, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

import { TripPreviewCard } from "./TripPreviewCard";
import { useAuthContext } from "../../context/authProvider";
import * as UserApi from "../../api/services/UserApi";

export const MyTrips = ({ myTrips }) => {
  const { user } = useAuthContext();
  const { showBoundary } = useErrorBoundary();
  const navigate = useNavigate();

  if (!myTrips) return <Box>No Trips available</Box>;

  return (
    <>
      {myTrips.length === 0 && <Box>No trips in Mytrips availabe...</Box>}
      {""}
      <Box>
        {myTrips.map((trip) => (
          <TripPreviewCard key={trip.id} tripId={trip.id} isInMyTrips={true} />
        ))}
      </Box>
    </>
  );
};
