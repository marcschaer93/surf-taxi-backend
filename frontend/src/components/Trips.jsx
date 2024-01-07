import { useEffect, useState } from "react";
import * as Api from "../services/tripService";

export const Trips = () => {
  const [trips, setTrips] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTrips = await Api.allTrips();
        setTrips(fetchedTrips);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };
    fetchData();
  }, []);
  console.log({ trips });

  return (
    <>
      {trips ? (
        <div>
          <h1>All Trips</h1>
          <ul>
            {trips.map((trip) => (
              <li key={trip.id}>{trip.start_location}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>No Trips</div>
      )}
    </>
  );
};
