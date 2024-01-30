// // import { useEffect, useState } from "react";
// // import { toast, ToastContainer } from "react-toastify";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import { useParams } from "react-router-dom";

// // import Box from "@mui/material/Box";
// // import Card from "@mui/material/Card";
// // import CardActions from "@mui/material/CardActions";
// // import CardContent from "@mui/material/CardContent";
// // import Button from "@mui/material/Button";
// // import Typography from "@mui/material/Typography";
// // import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
// // import { styled } from "@mui/material";

// // import * as TripApi from "../../api/services/TripApi";
// // import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
// // import { TripCardDetails } from "./TripCardDetails";
// // import * as PassengerApi from "../../api/services/PassengerApi";
// // import * as UserApi from "../../api/services/UserApi";
// // import { useAuthContext } from "../../context/authProvider";
// // import { useTripData } from "../../hooks/useTripData";

// // export const TripDetails = () => {
// //   // use the show the error in async function (ERROR BOUNDARY LIMITATIONS)
// //   const { showBoundary } = useErrorBoundary();
// //   const navigate = useNavigate();
// //   const { user } = useAuthContext();
// //   const { allTrips, myTrips } = useTripData();
// //   const { tripId } = useParams();
// //   //   console.log("TRIPID:", tripId);
// //   //   const numericTripId = parseInt(tripId, 10);
// //   //   console.log("ID:", numericTripId);
// //   const [tripPassengers, setTripPassengers] = useState([]);
// //   const [userAsPassenger, setUserAsPassenger] = useState(null);
// //   const [loadingPassengers, setLoadingPassengers] = useState(true);
// //   const [loading, setLoading] = useState(true);

// //   //   const [currentTrip, setCurrentTrip] = useState(null);
// //   const FavoriteButton = styled(Button)(({ theme }) => ({}));

// //   useEffect(() => {
// //     const fetchTripPassengers = async () => {
// //       try {
// //         const tripPassengers = await PassengerApi.getTripPassengers(tripId);
// //         if (tripPassengers) {
// //           setTripPassengers(tripPassengers);
// //         }
// //       } catch (error) {
// //         console.error(error);
// //         setTripPassengers([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchTripPassengers();
// //   }, []);

// //   console.log("TRIP PASSENGERS:", tripPassengers);

// //   //   const trips = [...allTrips, ...myTrips];
// //   const allTripsSet = new Set(allTrips.map((trip) => trip.id));
// //   const myTripsSet = new Set(myTrips.map((trip) => trip.id));

// //   const uniqueTrips = [...allTripsSet, ...myTripsSet].map(
// //     (tripId) =>
// //       allTrips.find((trip) => trip.id === tripId) ||
// //       myTrips.find((trip) => trip.id === tripId)
// //   );

// //   const tripDetails = uniqueTrips.find(
// //     (trip) => trip.id === parseInt(tripId, 10)
// //   );

// //   if (!tripDetails) {
// //     console.warn("NO TRIP DETAILS > IMPLEMENT getOneTrip()");
// //   }

// //   //   const handleJoinRequest = async (tripId) => {
// //   //     try {
// //   //       setLoadingPassengers(true);
// //   //       const newJoinRequest = await PassengerApi.requestToJoin(tripId);
// //   //       console.log("NEWJOINREQUESWT:", newJoinRequest);
// //   //       console.log("OLD PASSENEGRS", tripPassengers);

// //   //       // Update the passenger data after the join request
// //   //       setTripPassengers((prevPassengers) => {
// //   //         const updatedPassengers = [...prevPassengers, newJoinRequest];
// //   //         console.log("UPDATED PASSENEGRS", updatedPassengers);
// //   //         return updatedPassengers;
// //   //       });

// //   //       setLoadingPassengers(false);
// //   //     } catch (error) {
// //   //       console.error(error);
// //   //       setLoadingPassengers(false);
// //   //     }
// //   //   };

// //   const handleJoinRequest = async (tripId) => {
// //     try {
// //       setLoadingPassengers(true);
// //       console.log("OLD PASSENEGRS", tripPassengers);

// //       const newJoinRequest = await PassengerApi.requestToJoin(tripId);
// //       console.log("NEWJOINREQUESWT:", newJoinRequest);

// //       setTripPassengers((prevPassengers) => [
// //         ...prevPassengers,
// //         newJoinRequest,
// //       ]);
// //     } catch (error) {
// //       console.error(error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   console.log("UPDATED PASSENEGRS", tripPassengers);

// //   return (
// //     <>
// //       {loading ? (
// //         <Box>Loading...</Box>
// //       ) : (
// //         <Box>
// //           <TripCardDetails
// //             trip={tripDetails}
// //             passengers={tripPassengers}
// //             handleJoinRequest={handleJoinRequest}
// //           />
// //         </Box>
// //       )}
// //     </>
// //   );
// // };

// // //   const [loadingUserReservation, setIsLoadingUserReservation] = useState(true);
// // //   const [userReservation, setUserReservation] = useState(null);
// // //   const [trip, setTrip] = useState(null);
// // //   const myTripData = location.state?.myTripData;
// // //   const location = useLocation();
// // //   if (myTripData) {
// // //     return (
// // //       <>
// // //         <Box>
// // //           <TripCardDetails trip={myTripData} />
// // //         </Box>
// // //       </>
// // //     );
// // //   }
// // //   useEffect(() => {
// // //     const getTripDetails = async () => {
// // //       try {
// // //         const tripDetails = await TripApi.getOneTrip(tripId);
// // //         if (!tripDetails) {
// // //           toast.error("Trip not found. Please check the provided ID.");
// // //           navigate(-1);
// // //           // redirect
// // //         }
// // //         setTrip(tripDetails);
// // //         setIsLoadingTrips(false);
// // //       } catch (error) {
// // //         setIsLoadingTrips(false);
// // //         console.error("Error fetching trip:", error);
// // //       }
// // //     };

// // //     getTripDetails();
// // //   }, [tripId]);
// // // $$$
// // //
// // //   useEffect(() => {
// // //     const getUserReservation = async () => {
// // //       try {
// // //         if (user) {
// // //           const userReservation = await UserApi.getOneUserReservation(
// // //             user.username,
// // //             tripId
// // //           );
// // //           //   console.log("userReservation", userReservation);
// // //           setUserReservation(userReservation);
// // //           setIsLoadingUserReservation(false);
// // //         }
// // //       } catch (error) {
// // //         setIsLoadingUserReservation(false);
// // //         showBoundary(error);
// // //         console.error("Error fetching reservation:", error);
// // //       }
// // //     };

// // //     if (!trip) {
// // //       // Trip is still loading, wait for it to finish loading
// // //       return;
// // //     }

// // //     if (trip && trip.owner !== user.username) {
// // //       getUserReservation();
// // //     } else {
// // //       setIsLoadingUserReservation(false);
// // //       return;
// // //     }
// // //   }, [tripId, user, trip]);

// // //   return (
// // //     <>
// // //       {!loadingTrips && !loadingUserReservation ? (
// // //         <Box>
// // //           <TripCardDetails data={trip} reservation={userReservation} />
// // //         </Box>
// // //       ) : (
// // //         <Box>Loading...</Box>
// // //       )}
// // //     </>
// // //   );

// //$$$
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useAuthContext } from "../../context/authProvider";
// import * as PassengerApi from "../../api/services/PassengerApi";
// import { useTripData } from "../../hooks/useTripData";
// import TripCardDetails from "./TripCardDetails";

// export const TripDetails = () => {
//   const { user } = useAuthContext();
//   const { tripId } = useParams();
//   const [tripPassengers, setTripPassengers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { setAllTrips } = useTripData();

//   useEffect(() => {
//     const fetchTripPassengers = async () => {
//       try {
//         const tripPassengers = await PassengerApi.getTripPassengers(tripId);
//         if (tripPassengers) {
//           setTripPassengers(tripPassengers);
//         }
//       } catch (error) {
//         console.error(error);
//         setTripPassengers([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTripPassengers();
//   }, [tripId]);

//   const handleJoinRequest = async () => {
//     try {
//       setLoading(true);
//       const newJoinRequest = await PassengerApi.requestToJoin(tripId);
//       setTripPassengers((prevPassengers) => [
//         ...prevPassengers,
//         newJoinRequest,
//       ]);
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {!loading ? (
//         <TripCardDetails
//           trip={{ id: tripId /* add other trip details here */ }}
//           passengers={tripPassengers}
//           handleJoinRequest={handleJoinRequest}
//         />
//       ) : (
//         <div>Loading...</div>
//       )}
//     </>
//   );
// };

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAuthContext } from "../../context/authProvider";
import * as PassengerApi from "../../api/services/PassengerApi";
import * as TripApi from "../../api/services/TripApi";
import { useTripData } from "../../hooks/useTripData";
import TripCardDetails from "./TripCardDetails";

export const TripDetails = () => {
  const { tripId } = useParams();
  const { user } = useAuthContext();
  const [tripDetails, setTripDetails] = useState(null);
  const [passengers, setPassengers] = useState([]);
  const [userStatus, setUserStatus] = useState("Join Trip");

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const tripDetailsData = await TripApi.getOneTrip(tripId);
        setTripDetails(tripDetailsData);
      } catch (error) {
        console.error("Error fetching trip details:", error);
      }
    };

    const fetchPassengers = async () => {
      try {
        const tripPassengersData = await PassengerApi.getTripPassengers(tripId);
        setPassengers(tripPassengersData);
      } catch (error) {
        console.error("Error fetching passengers:", error);
      }
    };

    fetchTripDetails();
    fetchPassengers();
  }, [tripId]);

  useEffect(() => {
    const currentUserAsPassenger = passengers.find(
      (p) => p.username === user.username
    );

    if (currentUserAsPassenger) {
      setUserStatus(currentUserAsPassenger.reservationStatus);
    } else {
      setUserStatus("Join Trip");
    }
  }, [passengers, user.username]);

  const handleJoinTrip = async () => {
    try {
      const newJoinRequest = await PassengerApi.requestToJoin(tripId);
      console.log("NEW JOIN REQUEST STATUS", newJoinRequest.reservationStatus);

      // Update passengers state
      setPassengers((prevPassengers) => [...prevPassengers, newJoinRequest]);
    } catch (error) {
      console.error("Error joining trip:", error);
    }
  };

  return (
    <div>
      {tripDetails && (
        <div>
          <h2>Trip Details</h2>
          <p>Start Location: {tripDetails.startLocation}</p>
          <p>Destination: {tripDetails.destination}</p>

          <h3>Passengers</h3>
          <ul>
            {passengers.map((passenger) => (
              <li key={passenger.username + passenger.trip_id}>
                {passenger.username}
              </li>
            ))}
          </ul>

          <button onClick={handleJoinTrip}>{userStatus}</button>
        </div>
      )}
    </div>
  );
};
