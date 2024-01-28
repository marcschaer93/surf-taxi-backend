import { Box, Typography } from "@mui/material";
import { useAuthContext } from "../../context/authProvider";
import { useState, useEffect } from "react";

import { TripCardPreview } from "./TripCardPreview";
import { useErrorBoundary } from "react-error-boundary";

import * as UserApi from "../../api/services/UserApi";

export const MyTrips = () => {
  const { user } = useAuthContext();
  const { showBoundary } = useErrorBoundary();

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

  return (
    <>
      {userTripsLoading && <Box>Loading...</Box>}
      {""}
      <Box>
        {userTrips.map((trip) => (
          <TripCardPreview
            key={trip.id}
            data={trip}
            reservation={{ reservationStatus: trip.reservationStatus }}
          />
        ))}
      </Box>
    </>
  );
};
