import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, styled } from "@mui/material";

import { TripDetails } from "./TripDetails";
import { TripPreview } from "./TripPreview";

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

export const AllTrips = ({ allTrips, userTrips }) => {
  const navigate = useNavigate();

  const handleCardClick = (tripId) => {
    navigate(`/trips/${tripId}`);
  };

  return (
    <>
      {allTrips ? (
        <Box>
          <Typography sx={{ textAlign: "center" }} variant="h5">
            All Trips
          </Typography>
          <TripList component="ul">
            {allTrips.map((trip) => (
              <ListItem
                component="li"
                key={trip.id}
                onClick={() => handleCardClick(trip.id)}
              >
                <TripPreview trip={trip} userTrips={userTrips} />
              </ListItem>
            ))}
          </TripList>
        </Box>
      ) : (
        <Box>No Trips</Box>
      )}
    </>
  );
};
