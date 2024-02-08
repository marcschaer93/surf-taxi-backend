import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, styled } from "@mui/material";

import { TripPreviewCard } from "./TripPreviewCard";
import { useAuthContext } from "../../context/authProvider";
import { Title, TitleDivider } from "../../styles/fontStyles";

export const AllTrips = ({ allTrips, myTrips }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  if (!allTrips) return <Box>No Trips available</Box>;

  // trips without trips which are already in myTrips
  const filteredTrips = allTrips.filter(
    (trip) => !myTrips?.some((myTrip) => myTrip.id === trip.id)
  );

  const trips = user ? filteredTrips : allTrips;

  return (
    <>
      <Box>
        <Title variant="h3">All Trips</Title>
        <TitleDivider />
        {trips.length === 0 && (
          <Box sx={{ textAlign: "left", ml: "30px" }}>
            <Typography variant="h5">No trips available...</Typography>
          </Box>
        )}

        {trips.map((trip) => (
          <TripPreviewCard key={trip.id} tripData={trip} isInMyTrips={false} />
        ))}
      </Box>
    </>
  );
};
