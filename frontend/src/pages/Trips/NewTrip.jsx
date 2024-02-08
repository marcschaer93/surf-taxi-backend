import { Typography, Box } from "@mui/material";

import { useAuthContext } from "../../context/authProvider";
import { TripForm } from "./TripForm";
import { Title, TitleDivider } from "../../styles/fontStyles";

export const NewTrip = ({ addTrip }) => {
  const auth = useAuthContext();

  return (
    <Box>
      <Title variant="h3">New Trip</Title>
      <TitleDivider />
      <TripForm addTrip={addTrip} />
    </Box>
  );
};
