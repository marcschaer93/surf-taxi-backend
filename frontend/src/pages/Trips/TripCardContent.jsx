import { format } from "date-fns";
import AirportShuttleSharpIcon from "@mui/icons-material/AirportShuttleSharp";

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
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import StopIcon from "@mui/icons-material/Stop";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import InfoIcon from "@mui/icons-material/Info";
import ArrowRightAltSharpIcon from "@mui/icons-material/ArrowRightAltSharp";
import CalendarMonthSharpIcon from "@mui/icons-material/CalendarMonthSharp";
import PaidSharpIcon from "@mui/icons-material/PaidSharp";
import { theme } from "../../utils/theme";

export const TripCardContent = ({ tripDetails, preview }) => {
  const {
    originCity,
    originCountryCode,
    destinationCity,
    destinationCountryCode,
    stops,
    seats,
    date,
    travelInfo,
    costs,
  } = tripDetails;

  return (
    <>
      <>
        <Box>
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
              {originCity}
              <Typography
                component="span"
                variant="caption"
                color="text.secondary"
                sx={{ marginLeft: 0.5 }}
              >
                ({originCountryCode})
              </Typography>
            </Typography>

            <ArrowRightAltSharpIcon
              sx={{
                color: "action.active",
                mx: 2,
              }}
            />

            <Typography component="span" variant="h5" sx={{ marginLeft: 2 }}>
              {destinationCity}
              <Typography
                component="span"
                variant="caption"
                color="text.secondary"
                sx={{ marginLeft: 0.5 }}
              >
                ({destinationCountryCode})
              </Typography>
            </Typography>
          </Box>

          <Divider sx={{ my: 2, bgcolor: "divider" }} />

          <Box sx={{ mt: 2 }}>
            {/* Date */}
            <Typography color="text.secondary">
              <CalendarMonthSharpIcon sx={{ marginRight: 1 }} />
              {format(new Date(date), "dd MMMM, yyyy")}
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
            <Typography color="text.secondary">
              <AirportShuttleSharpIcon sx={{ marginRight: 1 }} />
              Mercedes Sprinter
            </Typography>

            {/* Travel Info */}
            {travelInfo && !preview && (
              <Typography color="text.secondary">
                <InfoIcon sx={{ marginRight: 1 }} />
                {travelInfo}
              </Typography>
            )}
          </Box>
        </Box>
      </>
    </>
  );
};
