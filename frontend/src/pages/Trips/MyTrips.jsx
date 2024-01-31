import { Box, Typography } from "@mui/material";
import { useAuthContext } from "../../context/authProvider";
import { useState, useEffect } from "react";

import { TripPreviewCard } from "./TripPreviewCard";
import { useErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

import * as UserApi from "../../api/services/UserApi";
import { useTripData } from "../../hooks/useTripData";

export const MyTrips = () => {
  const { user } = useAuthContext();
  const { showBoundary } = useErrorBoundary();
  const navigate = useNavigate();
  const { myTrips, setMyTrips } = useTripData();
  const [myTripsLoading, setMyTripsLoading] = useState(true);

  useEffect(() => {
    const getAllMyTrips = async () => {
      try {
        const myTripsData = await UserApi.getAllUserTrips(user.username);
        setMyTrips(myTripsData);
        setMyTripsLoading(false);
      } catch (error) {
        // Show error boundary
        showBoundary(error);
        console.error("Error fetching trips:", error);
        setMyTrips([]);
        setMyTripsLoading(false);
      }
    };
    if (user) {
      getAllMyTrips();
    }
  }, []);

  return (
    <>
      {myTrips.length === 0 && <Box>No trips in Mytrips availabe...</Box>}
      {myTripsLoading && <Box>Loading...</Box>}
      {""}
      <Box>
        {myTrips.map((trip) => (
          <TripPreviewCard key={trip.id} trip={trip} />
        ))}
      </Box>
    </>
  );
};
