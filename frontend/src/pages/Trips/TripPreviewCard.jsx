import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  styled,
  Chip,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authProvider";
import { StyledPreviewCard } from "../../styles/cardStyles";
import { TripCardContent } from "./TripCardContent";
import { useToggleFavoriteTrip } from "../../hooks/useToggleFavoriteTrip";
import { theme } from "../../utils/theme";
import { StatusChip } from "../../components/ui/StatusChip";
import { format } from "date-fns";

import StopIcon from "@mui/icons-material/Stop";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import ArrowRightAltSharpIcon from "@mui/icons-material/ArrowRightAltSharp";
import CalendarMonthSharpIcon from "@mui/icons-material/CalendarMonthSharp";
import PaidSharpIcon from "@mui/icons-material/PaidSharp";
import { ConditionalFavorite } from "../Favorites/ConditionalFavorite";

// DATA FLOW
// tripDetails       ===>     from parent
// isTripOrganizer   ===>     from parent
// isInMyTrips       ===>     from parent
//userReservation    ===>     API Call ALWAYS

const TripPreviewCard = ({ tripDetails, isInMyTrips, isTripOrganizer }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const tripId = tripDetails?.id;

  // Favorite trips hook (only for logged in users)
  // const { isFavorited, toggleFavorite } = useToggleFavoriteTrip(tripId);

  // const handleFavorite = (e, tripId) => {
  //   e.stopPropagation();
  //   toggleFavorite();
  // };

  const handleCardClick = () => {
    navigate(`/trips/${tripId}`, { state: { tripDetails } });
  };

  const { startLocation, destination, stops, seats, date, travelInfo, costs } =
    tripDetails;

  return (
    <StyledPreviewCard
      variant="outlined"
      onClick={handleCardClick}
      sx={{
        borderColor: isTripOrganizer
          ? theme.palette.contrast.main
          : theme.palette.grey[800],
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#fff",
          padding: "0px 0px",
          mb: -2, // Reduce margin below the flags
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2" sx={{ mx: 3, fontSize: "2.5rem" }}>
            🇪🇸
          </Typography>
          <Typography variant="body2" sx={{ mx: 3, fontSize: "2.5rem" }}>
            🇲🇦
          </Typography>
        </Box>

        {/* Conditional rendering based on user being logged in */}
        {!isInMyTrips && !isTripOrganizer && user && (
          <ConditionalFavorite tripId={tripId} />
        )}
      </Box>

      {isInMyTrips ? (
        <Box sx={{ position: "absolute", top: 18, right: 18 }}>
          <StatusChip
            status={tripDetails.userReservationStatus}
            isTripOrganizer={isTripOrganizer}
          />
        </Box>
      ) : null}

      <CardContent>
        {/* Trip Route */}
        <Box
          display="flex"
          justifyContent="left"
          alignItems="center"
          sx={{
            textAlign: "center",
          }}
        >
          <Typography component="span" variant="h5" sx={{ marginRight: 2 }}>
            {startLocation}
          </Typography>

          <ArrowRightAltSharpIcon
            sx={{
              color: theme.palette.text.secondary,
              mx: 1,
            }}
          />

          <Typography component="span" variant="h5" sx={{ marginLeft: 2 }}>
            {destination}
          </Typography>
        </Box>

        <Divider sx={{ my: 2, bgcolor: "divider" }} />

        {/* Date */}
        <Typography color="text">
          <CalendarMonthSharpIcon sx={{ marginRight: 1 }} />
          {format(new Date(date), "MMMM dd, yyyy")}
        </Typography>

        {/* Stops */}
        <Typography color="text.secondary">
          <StopIcon sx={{ marginRight: 1 }} />
          Stops: {stops}
        </Typography>

        {/* Available Seats */}
        <Typography color="text.secondary">
          <EventSeatIcon sx={{ marginRight: 1 }} />
          Available Seats: {seats}
        </Typography>

        {/* Trip costs */}
        <Typography color="text.secondary">
          <PaidSharpIcon sx={{ marginRight: 1 }} />
          Costs: {costs}
        </Typography>

        {/* Car */}
        {/* <Typography color="text.secondary">
          <PaidSharpIcon sx={{ marginRight: 1 }} />
          Mercedes Sprinter
        </Typography> */}

        {/* Travel Info */}
        {/* {travelInfo && (
          <Typography color="text.secondary">
            <InfoIcon sx={{ marginRight: 1 }} />
            {travelInfo}
          </Typography>
        )} */}
      </CardContent>
    </StyledPreviewCard>
  );
};

export default TripPreviewCard;
