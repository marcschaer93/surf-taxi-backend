import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import { useParams } from "react-router-dom";
// import * as Api from "../services/TripApi";
import * as TripApi from "../api/services/TripApi";
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";

export const TripDetail = () => {
  const { showBoundary } = useErrorBoundary();
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const tripDetail = await TripApi.getOneTrip(tripId);
        if (!tripDetail) {
          toast.error("Trip not found. Please check the provided ID.");
          // redirect
        }

        setTrip(tripDetail);
      } catch (err) {
        showBoundary(err);
        console.error("Error fetching trip:", err);
        // Handle error, e.g., redirect to an error page
      }
    };

    getData(); // Fetch the trip data when the component mounts
  }, [tripId]);

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
