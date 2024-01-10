import { Login } from "./Login";
import { Trips } from "../components/Trips";
import { NewTrip } from "./NewTrip";
import { RequireAuth } from "../components/RequireAuth";

export const Home = () => {
  return (
    <div>
      <Login />
      <Trips />
      <NewTrip />
    </div>
  );
};
