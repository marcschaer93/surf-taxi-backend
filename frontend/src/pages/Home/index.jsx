import { Login } from "../Login";
import { NewTrip } from "../Trips/NewTrip";
import { RequireAuth } from "../../components/RequireAuth";
import { useAuthContext } from "../../context/authProvider";
import { Box } from "@mui/material";
import { AllTrips } from "../Trips/AllTrips";
import { Link } from "react-router-dom";

export const Home = ({ allTrips, myTrips, addTrip }) => {
  const { user } = useAuthContext();

  return (
    <>
      <div>
        {user ? (
          <h1>{`Welcome Home ${user.username}`}</h1>
        ) : (
          <h1>Welcome to Surf Taxi</h1>
        )}
      </div>
      <Link to="trips">Trips</Link>
      {/* <AllTrips allTrips={allTrips} myTrips={myTrips} /> */}
    </>
  );
};
