import { Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../context/authProvider";
import { TripForm } from "./TripForm";
import { Title, TitleDivider } from "../../styles/fontStyles";
import { GoBackButton } from "../../components/ui/GoBackButton";
import { BottomActionBar } from "../../components/BottomActionBar";
import { useMyTripsContext } from "../../context/MyTripsProvider";

export const NewTrip = () => {
  const navigate = useNavigate();
  const auth = useAuthContext();
  const { myTrips, setMyTrips, addTrip } = useMyTripsContext();

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
      {/* <BottomActionBar
        variant={"contained"}
        color={"primary"}
        // onClick={handleSubmit(onFormSubmit)}
        onClick={console.log("NOT IMPL!")}
        buttonText={"Add Trip"}
      /> */}
    </Box>
  );
};
