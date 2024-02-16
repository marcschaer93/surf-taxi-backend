import React from "react"; // Ensure React import for JSX if using React 17 or earlier
import { Box, Typography } from "@mui/material";
import SurfingSharpIcon from "@mui/icons-material/SurfingSharp";
import { useAuthContext } from "../../context/authProvider";
import TripPreviewCard from "./TripPreviewCard";
import { Title, TitleDivider } from "../../styles/fontStyles";
import { theme } from "../../utils/theme";
import { useMyTrips } from "../../context/MyTripsProvider";

const MyTrips = () => {
  const { user } = useAuthContext();
  const { myTrips } = useMyTrips(); // Use the custom hook to access myTrips from the context
  const isEmpty = myTrips.length === 0;

  console.log("MYTRIPS", myTrips);

  return (
    <>
      <Box>
        <Title variant="h3">My Trips</Title>
        <TitleDivider />
      </Box>

      {isEmpty ? (
        <Box sx={{ textAlign: "center", mt: "80px", p: "25px" }}>
          <SurfingSharpIcon
            sx={{ fontSize: "3rem", color: theme.palette.text.secondary }}
          />
          <Typography variant="h6">
            No trips in myTrips available now
          </Typography>
          <Typography color="text.secondary">
            Add a new Trip or join another!
          </Typography>
        </Box>
      ) : (
        <Box sx={{ marginBottom: "80px" }}>
          {myTrips.map((trip) => (
            <TripPreviewCard
              key={trip.id}
              tripDetails={trip}
              isInMyTrips={true}
              isTripOrganizer={trip.owner === user.username}
            />
          ))}
        </Box>
      )}
    </>
  );
};

export default MyTrips;
