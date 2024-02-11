import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, styled } from "@mui/material";
import SurfingSharpIcon from "@mui/icons-material/SurfingSharp";

import { useAuthContext } from "../../context/authProvider";
import { Title, TitleDivider } from "../../styles/fontStyles";
import { theme } from "../../utils/theme";
import { TripPreviewCard } from "./TripPreviewCard";

export const AllTrips = ({ allTrips = [], myTrips = [] }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [tripsToShow, setTripsToShow] = useState([]);

  useEffect(() => {
    // trips without trips which are already in myTrips
    const updatedTripsToShow = user
      ? allTrips.filter(
          (trip) => !myTrips.some((myTrip) => myTrip.id === trip.id)
        )
      : allTrips;

    setTripsToShow(updatedTripsToShow);
  }, [myTrips]);

  const handleCardClick = (tripId) => {
    // navigate(`/my-trips/${tripId}`, {
    //   state: { myReservation },
    // });
    navigate(`/trips/${tripId}`);
  };

  return (
    <>
      <Box>
        <Box>
          <Title variant="h3">All Trips</Title>
          <TitleDivider />
        </Box>

        {tripsToShow.length === 0 && (
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
          {tripsToShow.map((trip) => (
            <TripPreviewCard
              key={trip.id}
              tripDetails={trip}
              isInMyTrips={false}
              isTripOwner={trip.owner === user.username}
              handleCardClick={handleCardClick}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};
