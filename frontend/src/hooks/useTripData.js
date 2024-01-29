import { useState, useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";

import * as TripApi from "../api/services/TripApi";
import * as UserApi from "../api/services/UserApi";
import { useAuthContext } from "../context/authProvider";

export const useTripData = () => {
  const { user } = useAuthContext();
  const { showBoundary } = useErrorBoundary();

  const [allTrips, setAllTrips] = useState([]);
  // const [userTrips, setUserTrips] = useState([]);

  const [error, setError] = useState(null);
  const [allTripsLoading, setAllTripsLoading] = useState(true);
  // const [userTripsLoading, setUserTripsLoading] = useState(true);

  useEffect(() => {
    const getAllTripsData = async () => {
      try {
        const tripsData = await TripApi.getAllTrips();

        // exclude trips where user === trip owner
        // $$$
        // if (!user) {
        //   setAllTrips(tripsData);
        // } else {
        //   const filteredtripsData = tripsData.filter(
        //     (trip) => trip.owner !== user.username
        //   );
        //   setAllTrips(filteredtripsData);
        // }

        setAllTrips(tripsData);

        setAllTripsLoading(false);
      } catch (error) {
        // Show error boundary
        showBoundary(error);

        console.error("Error fetching trips:", error);
        setAllTrips([]);
        setAllTripsLoading(false);
      }
    };

    getAllTripsData();
  }, [user]);

  // useEffect(() => {
  //   const getAllMyTrips = async () => {
  //     try {
  //       const userTripsData = await UserApi.getAllUserTrips(user.username);
  //       setUserTrips(userTripsData);
  //       setUserTripsLoading(false);
  //     } catch (error) {
  //       // Show error boundary
  //       showBoundary(error);
  //       console.error("Error fetching trips:", error);
  //       setUserTrips([]);
  //       setUserTripsLoading(false);
  //     }
  //   };
  //   if (user) {
  //     getAllMyTrips();
  //   }
  // }, [user]);

  const addTrip = async (tripData) => {
    try {
      // parse seats to number
      const parsedSeats = parseInt(tripData.seats, 10);
      const newTrip = await TripApi.createNewTrip({
        ...tripData,
        seats: parsedSeats,
      });

      setAllTrips((prevTrips) => [...prevTrips, newTrip]);
      console.log("Trip created successfully:", newTrip);
      setAllTripsLoading(false);
    } catch (error) {
      setAllTripsLoading(false);
      console.error(error);
    }
  };

  return { allTrips, setAllTrips, addTrip };
};
