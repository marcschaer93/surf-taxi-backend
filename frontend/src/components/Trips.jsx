import { useEffect, useState } from "react";
import * as Api from "../services/tripService";

export const Trips = () => {
  const [trips, setTrips] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allTripsData = await Api.allTrips();
        const allTrips = allTripsData.trips;
        setTrips(allTrips);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };
    fetchData();
  }, []);

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
