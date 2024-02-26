import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";

import * as ReservationApi from "../api/services/ReservationApi";
import * as TripApi from "../api/services/TripApi";
import * as UserApi from "../api/services/UserApi";
import { useAuthContext } from "../context/authProvider";
import { useErrorBoundary } from "react-error-boundary";
import { useFetchMyTrips } from "../hooks/useFetchMyTrips";

export const MyTripsContext = createContext();

export const MyTripsProvider = ({ children }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [loadingAction, setLoadingAction] = useState(false);
  const { showBoundary } = useErrorBoundary();
  const [reservations, setReservations] = useState([]);
  const [loadingReservations, setLoadingReservations] = useState(false); // false!
  const [reservationError, setReservationError] = useState(null);

  // const { myTrips, setMyTrips, loadingMyTrips, setLoadingMyTrips } =
  //   useFetchMyTrips();

  const [myTrips, setMyTrips] = useState([]);
  const [loadingMyTrips, setLoadingMyTrips] = useState(true);
  // Get user trips
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

  // get all trip reservations
  const fetchReservationsForTrip = useCallback(async (tripId) => {
    setLoadingReservations(true);
    try {
      const fetchedReservations = await ReservationApi.getAllTripReservations(
        tripId
      );
      setReservations(fetchedReservations);
    } catch (error) {
      console.error("Failed to fetch reservations", error);
      setReservationError(error);
    } finally {
      setLoadingReservations(false);
    }
  }, []);

  // add a new trip
  const addTrip = useCallback(
    async (tripData) => {
      try {
        // parse seats to number
        const parsedSeats = parseInt(tripData.seats, 10);
        const newTripData = await TripApi.createNewTrip({
          ...tripData,
          seats: parsedSeats,
        });

        const newTrip = { ...newTripData, userReservationStatus: "organizer" };
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

  // const deleteMyTrip = useCallback(
  //   async (tripId) => {
  //     try {
  //       await UserApi.deleteMyTrip(tripId, user.username);

  //       setMyTrips((prevTrips) =>
  //         prevTrips.filter((trip) => trip.id !== tripId)
  //       );

  //       // setPassengers((prev) => prev.filter((p) => p.));
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoadingMyTrips(false);
  //     }
  //   },
  //   [user, myTrips]
  // );

  // handle actions for trip reservations
  const handleAction = useCallback(
    async (actionType, data) => {
      setLoadingAction(true);
      try {
        switch (actionType) {
          case "join":
            const newReservation = await ReservationApi.createNewReservation(
              data.tripDetails.id
            );
            // IMPORTANT
            setReservations((prev) => [...prev, newReservation]);
            const joinedTrip = {
              ...data.tripDetails,
              userReservationStatus: newReservation.status,
            };
            setMyTrips((prevTrips) => [
              joinedTrip,
              ...prevTrips.filter((trip) => trip.id !== joinedTrip.id),
            ]);
            navigate("/my-trips");
            break;

          case "cancel":
            await ReservationApi.deleteOneReservation(data.tripDetails.id);
            // IMPORTANT
            setReservations((prev) =>
              prev.filter((p) => p.username !== user.username)
            );
            setMyTrips((prevTrips) =>
              prevTrips.filter((trip) => trip.id !== data.tripDetails.id)
            );
            navigate("/my-trips");
            break;

          case "delete":
            await UserApi.deleteMyTrip(data.tripDetails.id, user.username);
            setMyTrips((prevTrips) =>
              prevTrips.filter((trip) => trip.id !== data.tripDetails.id)
            );
            setReservations((prev) =>
              prev.filter((p) => p.tripId !== data.tripDetails.id)
            );
            navigate("/my-trips");
            break;

          case "confirm":
            const confirmedReservation =
              await ReservationApi.updateOneReservation(
                data.tripDetails.id,
                data.reservationUsername,
                "confirmed"
              );
            setReservations((prev) =>
              prev.map((p) =>
                p.username === data.reservationUsername
                  ? {
                      ...p,
                      status: confirmedReservation.status,
                    }
                  : p
              )
            );

            break;

          case "connect":
            const pendingReservation =
              await ReservationApi.updateOneReservation(
                data.tripDetails.id,
                data.reservationUsername,
                "pending"
              );
            // ??
            setReservations((prev) =>
              prev.map((p) =>
                p.username === data.reservationUsername
                  ? {
                      ...p,
                      status: pendingReservation.status,
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
    handleAction,
    fetchReservationsForTrip,
    reservations,
    loadingReservations,
  };

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
