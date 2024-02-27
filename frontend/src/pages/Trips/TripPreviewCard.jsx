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
// import { CardStatusChip } from "../../components/ui/CardStatusChip";
import { FavoriteButton } from "../../components/ui/FavoriteButton";
import { StyledPreviewCard } from "../../styles/cardStyles";
import { TripCardContent } from "./TripCardContent";
import { useToggleFavoriteTrip } from "../../hooks/useToggleFavoriteTrip";
import { theme } from "../../utils/theme";
import { useMyTripsContext } from "../../context/MyTripsProvider";
import { StatusChip } from "../../components/ui/StatusChip";
import { TitleDivider } from "../../styles/fontStyles";
import { format } from "date-fns";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import StopIcon from "@mui/icons-material/Stop";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import InfoIcon from "@mui/icons-material/Info";
import ArrowRightAltSharpIcon from "@mui/icons-material/ArrowRightAltSharp";
import CalendarMonthSharpIcon from "@mui/icons-material/CalendarMonthSharp";
import PaidSharpIcon from "@mui/icons-material/PaidSharp";

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
  const { isFavorited, toggleFavorite } = useToggleFavoriteTrip(tripId);

  const handleFavorite = (e, tripId) => {
    e.stopPropagation();
    toggleFavorite();
  };

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
      {/* {!isInMyTrips && !isTripOrganizer && user && (
        <FavoriteButton
          handleFavorite={handleFavorite}
          isFavorited={isFavorited}
        ></FavoriteButton>
      )} */}

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

        {!isInMyTrips && !isTripOrganizer && user && (
          <FavoriteButton
            handleFavorite={handleFavorite}
            isFavorited={isFavorited}
          />
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
          justifyContent="left" // Center the content horizontally
          alignItems="center" // Align items vertically
          sx={{
            textAlign: "center", // Center the text if it wraps
          }}
        >
          <Typography
            component="span" // Use span to keep inline with flex items
            variant="h5" // Adjust size for better mobile visibility
            sx={{ marginRight: 2 }} // Add some spacing before the arrow
          >
            {startLocation}
          </Typography>

          <ArrowRightAltSharpIcon
            sx={{
              color: theme.palette.text.secondary,
              mx: 1, // Margin on both sides for spacing
            }}
          />

          <Typography
            component="span" // Use span to keep inline with flex items
            variant="h5" // Adjust size for better mobile visibility
            sx={{ marginLeft: 2 }} // Add some spacing after the arrow
          >
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
