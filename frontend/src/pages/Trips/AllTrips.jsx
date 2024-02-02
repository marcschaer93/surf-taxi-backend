import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, styled } from "@mui/material";

import { TripPreviewCard } from "./TripPreviewCard";
import { useAuthContext } from "../../context/authProvider";

export const AllTrips = ({ allTrips, myTrips }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  if (!allTrips) return <Box>No Trips available</Box>;

  // trips without trips which are already in myTrips
  const filteredTrips = allTrips.filter(
    (trip) => !myTrips?.some((myTrip) => myTrip.id === trip.id)
  );

  const trips = user ? filteredTrips : allTrips;

  console.log("MYTRIPS", myTrips);
  console.log("TRIPS", trips);

  return (
    <>
      <Box>
        <Typography sx={{ textAlign: "center" }} variant="h5">
          All Trips
        </Typography>

        {trips.map((trip) => (
          <TripPreviewCard key={trip.id} trip={trip} isInMyTrips={false} />
        ))}
      </Box>
    </>
  );
};
