import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, styled } from "@mui/material";

import { TripDetails } from "./TripDetails";
import { TripPreviewCard } from "./TripPreviewCard";
import { useAuthContext } from "../../context/authProvider";

const TripList = styled(Box)(({ theme }) => ({
  listStyle: "none",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: 0, // Remove default margin
  padding: 0, // Remove default padding
  gap: theme.spacing(2),
}));

const ListItem = styled(Box)(({ theme }) => ({
  width: "95%",
  margin: "auto",
  padding: theme.spacing(1), // Adjust the spacing based on your preference
}));

export const AllTrips = ({ allTrips }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  if (!allTrips) return <Box>No Trips available</Box>;

  // exclude trips where user is owner
  const filteredTrips = allTrips.filter(
    (trip) => trip.owner !== user?.username
  );
  const trips = user ? filteredTrips : allTrips;

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
