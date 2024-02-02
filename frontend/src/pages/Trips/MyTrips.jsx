import { Box, Typography, styled, Paper } from "@mui/material";
import { useAuthContext } from "../../context/authProvider";
import { useState, useEffect } from "react";

import { TripPreviewCard } from "./TripPreviewCard";
import { useErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

import * as UserApi from "../../api/services/UserApi";
import { useTripData } from "../../hooks/useTripData";

export const MyTrips = ({ myTrips }) => {
  const { user } = useAuthContext();
  const { showBoundary } = useErrorBoundary();
  const navigate = useNavigate();
  console.log("MYTRIPS", myTrips);

  if (!myTrips) return <Box>No Trips available</Box>;

  return (
    <>
      {myTrips.length === 0 && <Box>No trips in Mytrips availabe...</Box>}
      {""}
      <Box>
        {myTrips.map((trip) => (
          <TripPreviewCard key={trip.id} trip={trip} isInMyTrips={true} />
        ))}
      </Box>
    </>
  );
};
