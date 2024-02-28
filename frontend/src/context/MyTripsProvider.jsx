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

  // Get all logged-in user related trips
  const { myTrips, setMyTrips, loadingMyTrips, setLoadingMyTrips } =
    useFetchMyTrips();

  // get all reservations for trip by ID
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
        return newTrip;
      } catch (error) {
        console.error(error);
        return null;
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
export const useMyTripsContext = () => {
  const context = useContext(MyTripsContext);
  if (!context) {
    throw new Error("useMyTrips must be used within a MyTripsProvider");
  }
  return context;
};
