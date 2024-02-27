// // const allMyOwnReservations = get all passengers where user.username === passenger.username

// // const allMyInvolvedTripReservations = allMyTripPassengers + allSelfPassengers

// export const useUserRelatedReservations = () => {
//   // const organizedTripIdsByUser = get all trips where user.username === trip.owner
//   // for every trip in myOrganizedTripIds:
//   // const allMyOrganizedTripPassengers = get all reservations where trip.id === tripId
// };

// // Better structured and clarified version of the code with comments

// // Hook name more accurately reflects its purpose
// export const useUserRelatedReservations = () => {
//   // Fetch trips organized by the user
//   const organizedTripsByUser = getTripsOrganizedByUser();

//   // Iterate over each trip ID the user has organized to fetch reservations
//   organizedTripsByUser.forEach((trip) => {
//     const reservationsForTrip = getReservationsForTrip(trip.id);
//     // Combine reservations for each trip into the main array
//     allRelevantTripReservations = [
//       ...allRelevantTripReservations,
//       ...reservationsForTrip,
//     ];
//   });

//   // Add reservations made by the user across any trip (self-booked)
//   const selfBookedReservations = getSelfBookedReservations();
//   // Combine organized trip reservations with self-booked reservations
//   const allMyInvolvedTripReservations = [
//     ...allRelevantTripReservations,
//     ...selfBookedReservations,
//   ];

//   // Assuming there's logic to fetch and return these reservations...
//   return allMyInvolvedTripReservations;
// };

// // Placeholder functions for fetching data, replace with actual data fetching logic
// const getTripsOrganizedByUser = () => {
//   // Fetch and return trip IDs organized by the user
//   return []; // Placeholder return
// };

// const getReservationsForTrip = (tripId) => {
//   // Fetch and return reservations for a given trip ID
//   return []; // Placeholder return
// };

// const getSelfBookedReservations = () => {
//   // Fetch and return reservations booked by the user for any trip
//   return []; // Placeholder return
// };
