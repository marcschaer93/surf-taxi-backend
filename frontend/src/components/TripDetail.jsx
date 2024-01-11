import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Api from "../api/services/Trip";

export const TripDetail = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const fetchTripById = async () => {
      try {
        const tripDetail = await Api.tripDetail(id);
        setTrip(tripDetail);
      } catch (error) {
        console.error("Error fetching trip:", error);
        // Handle error, e.g., redirect to an error page
      }
    };

    fetchTripById(); // Fetch the trip data when the component mounts

    // If you want to refetch the data whenever tripId changes, include tripId in the dependency array:
    // fetchTripById();

    // Cleanup function if needed
    return () => {
      // Cleanup logic if necessary
    };
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
