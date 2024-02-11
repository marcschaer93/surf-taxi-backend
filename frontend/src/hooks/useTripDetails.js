// import { useState, useEffect } from "react";

// import * as TripApi from "../api/services/TripApi";
// import { useAuthContext } from "../context/authProvider";

// export const useTripDetails = (tripId) => {
//   const { user } = useAuthContext();
//   const [tripDetails, setTripDetails] = useState(null);
//   const [loadingTripDetails, setLoadingTripDetails] = useState(true);

//   console.log("USES TRIP DETAILS TO FETCH TRIPDETAILS");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const tripDetailsData = await TripApi.getOneTrip(tripId);
//         setTripDetails(tripDetailsData);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoadingTripDetails(false);
//       }
//     };

//     fetchData();
//   }, [tripId, user]);

//   return { tripDetails, loadingTripDetails };
// };

import { useState, useEffect } from "react";
import * as TripApi from "../api/services/TripApi";
import { useAuthContext } from "../context/authProvider";
import * as UserApi from "../api/services/UserApi";

export const useTripDetails = (tripId, myTrips) => {
  const { user } = useAuthContext();
  const [tripDetails, setTripDetails] = useState(null);
  const [loadingTripDetails, setLoadingTripDetails] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let tripData;
        if (myTrips.some((trip) => trip.id === tripId)) {
          // Trip is in myTrips, so find and set it directly
          tripData = myTrips.find((trip) => trip.id === tripId);
        } else {
          // Trip is not in myTrips, fetch it from the API
          tripData = await TripApi.getOneTrip(tripId);
        }
        setTripDetails(tripData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingTripDetails(false);
      }
    };

    if (myTrips) {
      fetchData(); // Fetch data only if myTrips is available
    }
  }, [tripId, user, myTrips]);

  return { tripDetails, loadingTripDetails };
};
