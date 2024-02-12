import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as PassengerApi from "../api/services/PassengerApi";
import * as TripApi from "../api/services/TripApi";
import * as UserApi from "../api/services/UserApi";
import { useAuthContext } from "../context/authProvider";

export const useHandleAction = (
  tripId,
  setPassengers,
  setLoadingAction,
  setMyTrips
) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

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

            // const myTripsData = await UserApi.getAllUserTrips(user.username);
            // setMyTrips(myTripsData);

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
                      reservationStatus: connected.reservationStatus,
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
    [navigate, setPassengers, setLoadingAction, tripId, user.username]
  );

  return handleAction;
};
