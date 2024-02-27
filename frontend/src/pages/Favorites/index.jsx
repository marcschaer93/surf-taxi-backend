import { Box, Typography, Divider } from "@mui/material";
import React, { useMemo } from "react";

import { useAuthContext } from "../../context/authProvider";
import TripPreviewCard from "../Trips/TripPreviewCard";
import { useFetchFavoriteTrips } from "../../hooks/useFetchFavoriteTrips";
import { Title, TitleDivider } from "../../styles/fontStyles";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import { theme } from "../../utils/theme";
import { useMyTripsContext } from "../../context/MyTripsProvider";

export const Favorites = () => {
  const { user } = useAuthContext();
  // memoize favoriteIds to ensure that it only updates when user.favoriteIds actually changes, not when the user object itself might be recreated without meaningful changes to favoriteIds.
  console.log("USER FAVIDS", user.favoriteIds);
  const favoriteIds = useMemo(() => user.favoriteIds || [], [user.favoriteIds]);
  const { favoriteTrips, loading } = useFetchFavoriteTrips(favoriteIds);

  const { myTrips } = useMyTripsContext();

  return (
    <>
      {loading ? (
        <Box sx={{ textAlign: "center", marginTop: "30px" }}>Loading...</Box>
      ) : (
        <Box>
          <Title variant="h3">Favorites</Title>
          <TitleDivider />

          <Box sx={{ marginBottom: "80px" }}>
            {favoriteTrips.length > 0 ? (
              favoriteTrips.map((trip) => (
                <TripPreviewCard
                  key={trip.id}
                  tripDetails={trip}
                  isInMyTrips={false}
                />
              ))
            ) : (
              <Box sx={{ textAlign: "center", mt: "80px", p: "25px" }}>
                <FavoriteBorderSharpIcon
                  sx={{ fontSize: "3rem", color: theme.palette.text.secondary }}
                />
                <Typography variant="h5">No favorites yet</Typography>
                <Typography color="text.secondary">
                  Click the heart button to save trips as favorites.
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};
