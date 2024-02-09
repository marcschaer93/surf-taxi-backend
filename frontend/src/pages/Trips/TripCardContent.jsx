import { format } from "date-fns";

import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  styled,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import StopIcon from "@mui/icons-material/Stop";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import InfoIcon from "@mui/icons-material/Info";
import ArrowRightAltSharpIcon from "@mui/icons-material/ArrowRightAltSharp";
import CalendarMonthSharpIcon from "@mui/icons-material/CalendarMonthSharp";
import { theme } from "../../utils/theme";

export const TripCardContent = ({ tripData }) => {
  const { startLocation, destination, stops, seats, date, travelInfo } =
    tripData;

  return (
    <>
      <>
        <CardContent>
          {/* Trip Route */}
          <Typography variant="h5" gutterBottom>
            <Box display="flex" alignItems="center">
              {/* <LocationOnIcon sx={{ marginRight: 1 }} /> */}
              {startLocation} 🇪🇸{" "}
              <ArrowRightAltSharpIcon
                sx={{ color: theme.palette.text.secondary }}
              />{" "}
              {destination} 🇲🇦
            </Box>
          </Typography>

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

          {/* Travel Info */}
          {travelInfo && (
            <Typography color="text.secondary">
              <InfoIcon sx={{ marginRight: 1 }} />
              {travelInfo}
            </Typography>
          )}
        </CardContent>
      </>
    </>
  );
};
