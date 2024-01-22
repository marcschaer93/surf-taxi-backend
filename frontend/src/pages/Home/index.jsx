import { Login } from "../Login";
import { NewTrip } from "../NewTrip";
import { RequireAuth } from "../../components/RequireAuth";
import { useAuthContext } from "../../context/authProvider";
import { Box } from "@mui/material";
import { Trips } from "../../components/Trips";

export const Home = ({ trips, addTrip }) => {
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
      <Box>
        <Trips trips={trips} />
      </Box>
    </>
  );
};
