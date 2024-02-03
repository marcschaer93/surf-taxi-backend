import { Box, Typography } from "@mui/material";

import { useAuthContext } from "../../context/authProvider";
import { useFavorite } from "../../hooks/useFavorite";
import { useMyTrips } from "../../hooks/useMyTrips";
import { TripPreviewCard } from "../Trips/TripPreviewCard";

export const Favorites = () => {
  const { user } = useAuthContext();
  const { myTrips } = useMyTrips();

  const { isFavorited, toggleFavorite } = useFavorite();

  const favoriteIds = [...(user.favoriteIds || [])];

  return (
    <>
      <Box>
        <Typography sx={{ textAlign: "center" }} variant="h5">
          Favorites
        </Typography>

        {favoriteIds &&
          favoriteIds.map((id) => (
            <TripPreviewCard key={id} tripId={id} isInMyTrips={false} />
          ))}
      </Box>
    </>
  );
};
