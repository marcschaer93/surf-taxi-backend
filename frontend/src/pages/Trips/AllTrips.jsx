import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, styled } from "@mui/material";

import { TripPreviewCard } from "./TripPreviewCard";
import { useAuthContext } from "../../context/authProvider";
import { Title, TitleDivider } from "../../styles/fontStyles";
import SurfingSharpIcon from "@mui/icons-material/SurfingSharp";
import { theme } from "../../utils/theme";

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
        <Box>
          <Title variant="h3">All Trips</Title>
          <TitleDivider />
        </Box>

        {trips.length === 0 && (
          <Box sx={{ textAlign: "center", mt: "80px", p: "25px" }}>
            <SurfingSharpIcon
              sx={{ fontSize: "3rem", color: theme.palette.text.secondary }}
            />
            <Typography variant="h6">No trips available now</Typography>
            <Typography color="text.secondary">
              We will let you know when new trips are here!
            </Typography>
          </Box>
        )}

        <Box sx={{ marginBottom: "80px" }}>
          {trips.map((trip) => (
            <TripPreviewCard
              key={trip.id}
              tripData={trip}
              isInMyTrips={false}
              isTripOwner={trip.owner === user?.username}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};
