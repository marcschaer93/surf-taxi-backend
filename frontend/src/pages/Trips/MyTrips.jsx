import { Box, Typography } from "@mui/material";
import { useAuthContext } from "../../context/authProvider";
import { useState, useEffect } from "react";

import { TripCardPreview } from "./TripCardPreview";
import { useErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

import * as UserApi from "../../api/services/UserApi";

export const MyTrips = () => {
  const { user } = useAuthContext();
  const { showBoundary } = useErrorBoundary();
  const navigate = useNavigate();

  const [userTrips, setUserTrips] = useState([]);
  const [userTripsLoading, setUserTripsLoading] = useState(true);

  useEffect(() => {
    const getAllMyTrips = async () => {
      try {
        const allUserTrips = await UserApi.getAllUserTrips(user.username);
        setUserTrips(allUserTrips);
        setUserTripsLoading(false);
      } catch (error) {
        // Show error boundary
        showBoundary(error);
        console.error("Error fetching trips:", error);
        setUserTrips([]);
        setUserTripsLoading(false);
      }
    };
    if (user) {
      getAllMyTrips();
    }
  }, []);

  const handleCardClick = (trip) => {
    navigate(`/trips/${trip.id}`, { state: { myTripData: trip } });
  };

  return (
    <>
      {userTripsLoading && <Box>Loading...</Box>}
      {""}
      <Box>
        {userTrips.map((trip) => (
          <TripCardPreview
            key={trip.id}
            trip={trip}
            // reservation={{ reservationStatus: trip.reservationStatus }}
            handleCardClick={() => handleCardClick(trip)}
          />
        ))}
      </Box>
    </>
  );
};
