import { Box, Typography, Divider } from "@mui/material";

import { useAuthContext } from "../../context/authProvider";
import { useMyTrips } from "../../hooks/useMyTrips";
import { TripPreviewCard } from "../Trips/TripPreviewCard";
import { useFavoriteTrips } from "../../hooks/useFavoriteTrips";
import { Title, TitleDivider } from "../../styles/fontStyles";

export const Favorites = () => {
  const { user } = useAuthContext();
  const { myTrips } = useMyTrips();
  const favoriteIds = user.favoriteIds || [];
  const { favoriteTrips, loading } = useFavoriteTrips(favoriteIds);

  return (
    <>
      {loading ? (
        <Box sx={{ textAlign: "center", marginTop: "30px" }}>Loading...</Box>
      ) : (
        <Box>
          <Title variant="h3">Favorites</Title>
          <TitleDivider />

          {favoriteTrips.length > 0 ? (
            favoriteTrips.map((trip) => (
              <TripPreviewCard
                key={trip.id}
                tripData={trip}
                isInMyTrips={false}
              />
            ))
          ) : (
            <Box sx={{ textAlign: "left", ml: "30px" }}>
              <Typography variant="h5">No favorites yet...</Typography>
              <Typography color="text.secondary">
                Click the heart button to save trips as favorites.
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};
