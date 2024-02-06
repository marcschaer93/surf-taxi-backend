import { Box, Typography } from "@mui/material";

import { useAuthContext } from "../../context/authProvider";
import { useMyTrips } from "../../hooks/useMyTrips";
import { TripPreviewCard } from "../Trips/TripPreviewCard";
import { useFavoriteTrips } from "../../hooks/useFavoriteTrips";

export const Favorites = () => {
  const { user } = useAuthContext();
  const { myTrips } = useMyTrips();
  const favoriteIds = user.favoriteIds || [];
  const { favoriteTrips, loading } = useFavoriteTrips(favoriteIds);

  return (
    <Box>
      <Typography sx={{ textAlign: "center" }} variant="h5">
        Favorites
      </Typography>

      {loading ? (
        <Box>Loading...</Box>
      ) : favoriteTrips.length > 0 ? (
        favoriteTrips.map((trip) => (
          <TripPreviewCard key={trip.id} tripData={trip} isInMyTrips={false} />
        ))
      ) : (
        <Typography>No favorite trips found</Typography>
      )}
    </Box>
  );
};
