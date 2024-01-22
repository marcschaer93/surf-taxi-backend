import { useAuthContext } from "../context/authProvider";
import { TripForm } from "../components/form/TripForm";

export const NewTrip = ({ addTrip }) => {
  const auth = useAuthContext();

  if (!auth.user)
    return (
      <>
        <h1>{`NewTrip --> Login required!`}</h1>
      </>
    );

  return (
    <div>
      <h1>New Trip</h1>
      <TripForm addTrip={addTrip} />
    </div>
  );
};
