import React from "react"; // Ensure React import for JSX if using React 17 or earlier
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import SurfingSharpIcon from "@mui/icons-material/SurfingSharp";
import { useAuthContext } from "../../context/authProvider";
import TripPreviewCard from "./TripPreviewCard";
import { Title, TitleDivider } from "../../styles/fontStyles";
import { theme } from "../../utils/theme";
import { useMyTripsContext } from "../../context/MyTripsProvider";
import { useState } from "react";

const MyTrips = () => {
  const { user } = useAuthContext();
  const { myTrips } = useMyTripsContext();
  const isEmpty = myTrips.length === 0;

  const [showOrganizerTrips, setShowOrganizerTrips] = useState(false);

  const handleToggleChange = (e) => {
    setShowOrganizerTrips(e.target.checked);
  };

  const filteredTrips = myTrips.filter((trip) =>
    showOrganizerTrips
      ? trip.owner === user.username
      : trip.owner !== user.username
  );

  return (
    <>
      <Box>
        <Title variant="h3">My Trips</Title>
        <TitleDivider />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <FormGroup row>
          <Typography sx={{ marginRight: 1 }}>Passenger</Typography>
          <Switch checked={showOrganizerTrips} onChange={handleToggleChange} />
          <Typography sx={{ marginLeft: 1 }}>Organizer</Typography>
        </FormGroup>
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
          {filteredTrips.map((trip) => (
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
