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

export const TripCardContent = ({ tripData }) => {
  const { startLocation, destination, stops, seats, date, travelInfo } =
    tripData;

  return (
    <>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {`${startLocation} 🇪🇸`} - {`${destination} 🇲🇦`}
        </Typography>

        <Typography color="text">
          <Box component="span">{format(new Date(date), "MMMM dd, yyyy")}</Box>
        </Typography>

        <Typography color="text.secondary">
          <Box component="span">Stops: {stops}</Box>
        </Typography>

        <Typography color="text.secondary">
          <Box component="span">Available Seats: {seats}</Box>
        </Typography>

        <Typography color="text.secondary">
          <Box component="span">Travel Info:</Box>
          <Typography>{travelInfo}</Typography>
        </Typography>
      </CardContent>
    </>
  );
};
