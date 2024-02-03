import { Typography, Box } from "@mui/material";

import { useAuthContext } from "../../context/authProvider";
import { TripForm } from "./TripForm";

export const NewTrip = ({ addTrip }) => {
  const auth = useAuthContext();

  return (
    <Box>
      <Typography>New Trip</Typography>
      <TripForm addTrip={addTrip} />
    </Box>
  );
};
