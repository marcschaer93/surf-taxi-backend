// import { useState, useEffect } from "react";
// import * as UserApi from "../api/services/UserApi"; // Import your UserApi service

// // Define the custom hook function
// export const useUserReservation = (
//   user,
//   tripId,
//   isTripOrganizer,
//   isInMyTrips
// ) => {
//   const [userReservation, setUserReservation] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Define the asynchronous function to fetch user reservation data
//     const fetchUserReservation = async () => {
//       try {
//         const userReservationData = await UserApi.getOneUserReservation(
//           user.username,
//           tripId
//         );
//         setUserReservation(userReservationData);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // Fetch user reservation data if the conditions are met
//     if (!isTripOrganizer && isInMyTrips) {
//       fetchUserReservation();
//     }
//   }, [user, tripId, isTripOrganizer, isInMyTrips]);

//   // Return an object containing userReservation and loading state
//   return { userReservation, loading };
// };
