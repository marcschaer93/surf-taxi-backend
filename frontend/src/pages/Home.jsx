import { Login } from "./Login";
import { Trips } from "../components/Trips";
import { NewTrip } from "./NewTrip";
import { RequireAuth } from "../components/RequireAuth";

export const Home = ({ trips, addTrip }) => {
  return (
    <div>
      <Login />
      <Trips trips={trips} />
      <NewTrip addTrip={addTrip} />
    </div>
  );
};
