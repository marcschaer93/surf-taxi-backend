import { Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../context/authProvider";
import { TripForm } from "./TripForm";
import { Title, TitleDivider } from "../../styles/fontStyles";
import { GoBackButton } from "../../components/ui/GoBackButton";

export const NewTrip = ({ addTrip }) => {
  const auth = useAuthContext();
  const navigate = useNavigate();

  const handleGoBackButton = (e, tripId) => {
    e.stopPropagation();
    navigate(-1);
  };

  return (
    <Box>
      <Box>
        <GoBackButton handleGoBack={() => navigate(-1)} />
        <Title variant="h3">New Trip</Title>
        <TitleDivider />
      </Box>

      <TripForm addTrip={addTrip} />
    </Box>
  );
};
