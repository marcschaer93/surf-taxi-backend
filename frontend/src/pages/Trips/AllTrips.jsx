import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, styled } from "@mui/material";

import TripPreviewCard from "./TripPreviewCard";
import { useAuthContext } from "../../context/authProvider";
import { Title, TitleDivider } from "../../styles/fontStyles";
import SurfingSharpIcon from "@mui/icons-material/SurfingSharp";
import { theme } from "../../utils/theme";
import { useMyTrips } from "../../context/MyTripsProvider";

// DATA FLOW
// allTrips         ===>     API Call, init data
// myTrips          ===>     API Call, init data

const AllTrips = ({ allTrips }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [visibleTrips, setVisibleTrips] = useState(allTrips);
  const { myTrips } = useMyTrips();

  // Filter out trips already in user's list
  // useEffect(() => {
  //   const filteredTrips = allTrips.filter(
  //     (trip) => !myTrips?.some((myTrip) => myTrip.id === trip.id)
  //   );

  //   setVisibleTrips(filteredTrips);
  // }, [myTrips, allTrips]);

  useEffect(() => {
    // Extract trip IDs from myTrips for comparison
    const myTripsIds = myTrips.map((trip) => trip.id);

    // Filter allTrips based on whether their ID appears in myTripsIds
    const filteredTrips = allTrips.filter(
      (trip) => !myTripsIds.includes(trip.id)
    );

    setVisibleTrips(filteredTrips);
  }, [myTrips, allTrips]);

  const isEmpty = visibleTrips.length === 0;

  console.log("VISIBLETREIPS", visibleTrips);

  return (
    <>
      <Box>
        <Box>
          <Title variant="h3">Explore Trips</Title>
          <TitleDivider />
        </Box>

        {isEmpty ? (
          <Box sx={{ textAlign: "center", mt: "80px", p: "25px" }}>
            <SurfingSharpIcon
              sx={{ fontSize: "3rem", color: theme.palette.text.secondary }}
            />
            <Typography variant="h6">No trips available now</Typography>
            <Typography color="text.secondary">
              We will let you know when new trips are here!
            </Typography>
          </Box>
        ) : (
          <Box sx={{ marginBottom: "80px" }}>
            {visibleTrips.map((trip) => (
              <TripPreviewCard
                key={trip.id}
                tripDetails={trip}
                isInMyTrips={false}
                isTripOrganizer={trip.owner === user.username}
              />
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default AllTrips;
