import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

import * as PassengerApi from "../api/services/PassengerApi";
import * as TripApi from "../api/services/TripApi";
import * as UserApi from "../api/services/UserApi";
import { useAuthContext } from "../context/authProvider";
import { useErrorBoundary } from "react-error-boundary";

export const MyTripsContext = createContext();

export const MyTripsProvider = ({ children }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [myTrips, setMyTrips] = useState([]);
  const [loadingMyTrips, setLoadingMyTrips] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);
  const { showBoundary } = useErrorBoundary();
  const [passengers, setPassengers] = useState([]);
  const [loadingPassengers, setLoadingPassengers] = useState(false); // false!
  const [passengerError, setPassengerError] = useState(null);
  const [myReservations, setMyReservations] = useState([]);
  const [loadingMyReservations, setLoadingMyReservations] = useState(true);

  // Get MyTrips
  useEffect(() => {
    const getAllMyTrips = async () => {
      try {
        const myTripsData = await UserApi.getAllUserTrips(user.username);
        setMyTrips(myTripsData);
      } catch (error) {
        // Show error boundary
        showBoundary(error);
        console.error("Error fetching trips:", error);
        setMyTrips([]);
      } finally {
        setLoadingMyTrips(false);
      }
    };
    if (user) {
      getAllMyTrips();
    } else {
      setLoadingMyTrips(false); // Ensure loading is stopped if there's no user
    }
  }, [user]);

  // Get Myreservations
  useEffect(() => {
    const getAllMyReservations = async () => {
      try {
        const myReservationsData = await UserApi.getAllUserReservations(
          user.username
        );
        setMyReservations(myReservationsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingMyReservations(false);
      }
    };

    getAllMyReservations();
  }, [user, myTrips]);
  // Example of a function to fetch passengers for a specific trip
  const fetchPassengersForTrip = useCallback(async (tripId) => {
    setLoadingPassengers(true);
    try {
      const fetchedPassengers = await PassengerApi.getTripPassengers(tripId);
      setPassengers(fetchedPassengers);
    } catch (error) {
      console.error("Failed to fetch passengers", error);
      setPassengerError(error);
    } finally {
      setLoadingPassengers(false);
    }
  }, []);

  const addTrip = useCallback(
    async (tripData) => {
      try {
        // parse seats to number
        const parsedSeats = parseInt(tripData.seats, 10);
        const newTrip = await TripApi.createNewTrip({
          ...tripData,
          seats: parsedSeats,
        });

        // setAllTrips((prevTrips) => [...prevTrips, newTrip]);
        setMyTrips((prevTrips) => [...prevTrips, newTrip]);
        console.log("Trip created successfully:", newTrip);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingMyTrips(false);
      }
    },
    [user]
  );

  const deleteMyTrip = useCallback(
    async (tripId) => {
      try {
        await UserApi.deleteMyTrip(tripId, user.username);
        setMyTrips((prevTrips) =>
          prevTrips.filter((trip) => trip.id !== tripId)
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingMyTrips(false);
      }
    },
    [user, myTrips]
  );

  const handleAction = useCallback(
    async (actionType, data) => {
      setLoadingAction(true);
      try {
        switch (actionType) {
          case "join":
            const newJoinRequest = await PassengerApi.requestToJoin(
              data.tripDetails.id
            );
            setPassengers((prev) => [...prev, newJoinRequest]);
            setMyTrips((prevTrips) => {
              return [data.tripDetails, ...(prevTrips || [])];
            });
            setMyReservations((prev) => [...prev, newJoinRequest]);

            navigate("/my-trips");

            break;
          case "cancel":
            await PassengerApi.cancelJoinRequest(data.tripDetails.id);
            setPassengers((prev) =>
              prev.filter((p) => p.username !== user.username)
            );

            setMyTrips((prevTrips) =>
              prevTrips.filter((trip) => trip.id !== data.tripDetails.id)
            );

            setMyReservations((prev) =>
              prev.filter((r) => r.username !== user.username)
            );

            navigate("/my-trips");
            // Optionally, update `myTrips` state if needed
            break;
          case "delete":
            await UserApi.deleteMyTrip(tripId, user.username);

            // const myTripsData = await UserApi.getAllUserTrips(user.username);
            // setMyTrips(myTripsData);

            // setPassengers([]);
            navigate("/my-trips");
            // Redirect or update state as needed
            break;
          case "confirm":
            const confirmedPassenger = await PassengerApi.updatePassengerStatus(
              data.tripDetails.id,
              data.passengerUsername,
              "confirmed"
            );
            setPassengers((prev) =>
              prev.map((p) =>
                p.username === data.passengerUsername
                  ? {
                      ...p,
                      reservationStatus: confirmedPassenger.reservationStatus,
                    }
                  : p
              )
            );

            break;
          case "connect":
            const connectedPassenger = await PassengerApi.updatePassengerStatus(
              data.tripDetails.id,
              data.passengerUsername,
              "pending"
            );
            setPassengers((prev) =>
              prev.map((p) =>
                p.username === data.passengerUsername
                  ? {
                      ...p,
                      reservationStatus: connectedPassenger.reservationStatus,
                    }
                  : p
              )
            );
            break;
          default:
            console.error("Unhandled action type:", actionType);
        }
      } catch (error) {
        console.error(`Error handling action ${actionType}:`, error);
      } finally {
        setLoadingAction(false);
      }
    },
    [user, myTrips, setMyTrips]
  );

  const value = {
    myTrips,
    loadingMyTrips,
    addTrip,
    deleteMyTrip,
    handleAction,
    fetchPassengersForTrip,
    passengers,
    loadingPassengers,
    myReservations,
    loadingMyReservations,
  };

  //   const value = useMemo(
  //     () => ({
  //       myTrips,
  //       loadingMyTrips,
  //       addTrip,
  //       deleteMyTrip,
  //       handleAction,
  //       fetchPassengersForTrip,
  //       passengers,
  //       loadingPassengers,
  //     }),
  //     [myTrips, loadingMyTrips, passengers, loadingPassengers]
  //   );

  return (
    <MyTripsContext.Provider value={value}>{children}</MyTripsContext.Provider>
  );
};

// Custom hook for easy consumption
export const useMyTrips = () => {
  const context = useContext(MyTripsContext);
  if (!context) {
    throw new Error("useMyTrips must be used within a MyTripsProvider");
  }
  return context;
};
