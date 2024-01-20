import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import * as Api from "../services/TripApi";
import * as TripApi from "../api/services/TripApi";

export const TripDetail = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const fetchTripById = async () => {
      try {
        const tripDetail = await TripApi.getOneTrip(id);
        console.log("tripDetail", tripDetail);
        setTrip(tripDetail);
      } catch (error) {
        console.error("Error fetching trip:", error);
        // Handle error, e.g., redirect to an error page
      }
    };

    fetchTripById(); // Fetch the trip data when the component mounts
  }, [id]);

  return (
    <div>
      {trip ? (
        <div>
          <h1>Trip Detail</h1>
          <p>{trip.seats}</p>
          {/* Display trip details here */}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
