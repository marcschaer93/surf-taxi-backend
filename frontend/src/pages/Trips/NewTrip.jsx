import { Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../context/authProvider";
import { TripForm } from "./TripForm";
import { Title, TitleDivider } from "../../styles/fontStyles";
import { GoBackButton } from "../../components/ui/GoBackButton";
import { BottomActionBar } from "../../components/BottomActionBar";
import { useMyTrips } from "../../context/MyTripsProvider";

export const NewTrip = () => {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const { myTrips, setMyTrips, addTrip } = useMyTrips();

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

      {/* Bottom action bar */}
      <BottomActionBar
        variant={"contained"}
        color={"primary"}
        // onClick={handleSubmit(onFormSubmit)}
        onClick={console.log("NOT IMPL!")}
        buttonText={"Add Trip"}
      />
    </Box>
  );
};
