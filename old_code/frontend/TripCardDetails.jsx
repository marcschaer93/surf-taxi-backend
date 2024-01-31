// // // import React, { useState } from "react";
// // // import {
// // //   Box,
// // //   Card,
// // //   CardContent,
// // //   CardActions,
// // //   Button,
// // //   Typography,
// // //   styled,
// // // } from "@mui/material";
// // // import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
// // // import { useAuthContext } from "../../context/authProvider";
// // // import { useNavigate, useLocation } from "react-router-dom";
// // // import * as TripApi from "../../api/services/TripApi";
// // // import * as UserApi from "../../api/services/UserApi";
// // // import * as PassengerApi from "../../api/services/PassengerApi";
// // // import { toast } from "react-toastify";
// // // import { useTripData } from "../../hooks/useTripData";
// // // import { useEffect } from "react";

// // // const FavoriteButton = styled(Button)(({ theme }) => ({
// // //   color: theme.palette.error.main,
// // // }));

// // // export const TripCardDetails = ({ trip, passengers }) => {
// // //   console.log("TRIP:", trip);
// // //   const { user } = useAuthContext();
// // //   const { setAllTrips } = useTripData();
// // //   const navigate = useNavigate();
// // //   const tripId = trip.id;
// // //   // const userAsPassenger = passengers?.find((p) => p.username === user.username);
// // //   const [currentUserAsPassenger, setCurrentUserAsPassenger] = useState(null);
// // //   const [isLoading, setIsLoading] = useState(true);
// // //   const [tripStatus, setTripStatus] = useState(null);

// // //   useEffect(() => {
// // //     const currentUserPassenger = passengers?.find(
// // //       (p) => p.username === user.username
// // //     );
// // //     setCurrentUserAsPassenger(currentUserPassenger);
// // //   }, [passengers, user]);

// // //   useEffect(() => {
// // //     if (currentUserAsPassenger) {
// // //       console.log("CURREN RESER$$", currentUserAsPassenger.reservationStatus);
// // //       setTripStatus(currentUserAsPassenger.reservationStatus);
// // //     } else {
// // //       setTripStatus("Join Trip");
// // //     }
// // //   }, [currentUserAsPassenger, user]);

// // //   const handleJoinRequest = async (tripId) => {
// // //     try {
// // //       setIsLoading(true);
// // //       const newJoinRequest = await PassengerApi.requestToJoin(tripId);
// // //       console.log("NEWJOINREQUESWT:", newJoinRequest);
// // //       // setCurrentUserAsPassenger(newJoinRequest);

// // //       setCurrentUserAsPassenger((prevData) => ({
// // //         ...prevData,
// // //         reservationStatus: newJoinRequest.reservationStatus,
// // //       }));

// // //       setTripStatus(newJoinRequest.reservationStatus);

// // //       setIsLoading(false);
// // //     } catch (error) {
// // //       console.error(error);
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     console.log("Updated passengers:", passengers);
// // //   }, [passengers]);

// // //   const isTripOwner = trip.owner === user.username;
// // //   // const status = reservation ? reservation.reservationStatus : "Join Trip";
// // //   // const status = userAsPassenger
// // //   //   ? userAsPassenger.reservationStatus
// // //   //   : "Join Trip";
// // //   // const userTripInteractionStatus = isTripOwner ? null : status;

// // //   const handleFavorite = (e, tripId) => {
// // //     console.log(`added trip with id: ${tripId} to favorites. NOT IMPLEMENTED`);
// // //   };

// // //   const handleDeleteTripAsOwner = async (e) => {
// // //     e.stopPropagation();
// // //     try {
// // //       await UserApi.deleteMyTrip(tripId, user.username);
// // //       setAllTrips((prevTrips) => {
// // //         const updatedTrips = prevTrips.filter((trip) => trip.id !== tripId);
// // //         return updatedTrips;
// // //       });
// // //       toast.success("Successfully deleted trip!");
// // //       navigate(-1);
// // //     } catch (error) {
// // //       console.error(error);
// // //       toast.error(`Failed to remove trip`);
// // //     }
// // //   };

// // //   const handleBack = () => {
// // //     // Navigate back to the previous page
// // //     navigate(-1);
// // //   };

// // //   return (
// // //     <Card variant="outlined">
// // //       <CardContent>
// // //         <Typography variant="h6" gutterBottom>
// // //           {trip.startLocation} - {trip.destination}
// // //         </Typography>

// // //         <Typography color="text.secondary">
// // //           <Box component="span">Stops: {trip.stops}</Box>
// // //         </Typography>

// // //         {passengers && isTripOwner && (
// // //           <Typography color="text.secondary">
// // //             Passengers:{" "}
// // //             {passengers.map((p) => (
// // //               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// // //                 <Typography>{p.username}</Typography>
// // //                 <Typography>{p.status}</Typography>
// // //               </Box>
// // //             ))}
// // //           </Typography>
// // //         )}

// // //         {/* Add other trip details here */}
// // //       </CardContent>

// // //       <CardActions>
// // //         {!isTripOwner && (
// // //           <Button
// // //             size="small"
// // //             variant="outlined"
// // //             onClick={() => handleJoinRequest(tripId)}
// // //           >
// // //             {tripStatus}
// // //             {/* {currentUserAsPassenger.reservationStatus} */}
// // //           </Button>
// // //         )}
// // //         <Button size="small" onClick={handleBack} variant="outlined">
// // //           Go Back
// // //         </Button>

// // //         {isTripOwner && (
// // //           <Button
// // //             sx={{ color: isTripOwner ? "red" : "green" }}
// // //             size="small"
// // //             variant="text"
// // //           >
// // //             owner
// // //           </Button>
// // //         )}

// // //         {isTripOwner && (
// // //           <Button
// // //             onClick={(e) => handleDeleteTripAsOwner(e)}
// // //             sx={{ color: isTripOwner ? "red" : "green" }}
// // //             size="small"
// // //             variant="text"
// // //           >
// // //             ❌
// // //           </Button>
// // //         )}

// // //         {handleFavorite && (
// // //           <FavoriteButton
// // //             size="small"
// // //             onClick={(e) => handleFavorite(e, tripId)}
// // //           >
// // //             <FavoriteTwoToneIcon />
// // //           </FavoriteButton>
// // //         )}
// // //       </CardActions>
// // //     </Card>
// // //   );
// // // };

// // import React, { useState, useEffect } from "react";
// // import {
// //   Box,
// //   Card,
// //   CardContent,
// //   CardActions,
// //   Button,
// //   Typography,
// //   styled,
// // } from "@mui/material";
// // import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
// // import { useAuthContext } from "../../context/authProvider";
// // import { useNavigate } from "react-router-dom";
// // import * as PassengerApi from "../../api/services/PassengerApi";
// // import { toast } from "react-toastify";
// // import { useTripData } from "../../hooks/useTripData";

// // // import React, { useState } from "react";
// // // import {
// // //   Box,
// // //   Card,
// // //   CardContent,
// // //   CardActions,
// // //   Button,
// // //   Typography,
// // //   styled,
// // // } from "@mui/material";
// // // import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
// // // import { useAuthContext } from "../../context/authProvider";
// // // import { useNavigate, useLocation } from "react-router-dom";
// // // import * as TripApi from "../../api/services/TripApi";
// // // import * as UserApi from "../../api/services/UserApi";
// // // import * as PassengerApi from "../../api/services/PassengerApi";
// // // import { toast } from "react-toastify";
// // // import { useTripData } from "../../hooks/useTripData";
// // // import { useEffect } from "react";

// // const FavoriteButton = styled(Button)(({ theme }) => ({
// //   color: theme.palette.error.main,
// // }));

// // export const TripCardDetails = ({ trip, passengers, handleJoinRequest }) => {
// //   const { user } = useAuthContext();
// //   const { setAllTrips } = useTripData();
// //   const navigate = useNavigate();
// //   const tripId = trip.id;
// //   const [tripStatus, setTripStatus] = useState("Join Trip");

// //   const currentUserAsPassenger = passengers.find(
// //     (p) => p.username === user.username
// //   );

// //   useEffect(() => {
// //     if (currentUserAsPassenger) {
// //       setTripStatus(currentUserAsPassenger.reservationStatus);
// //     } else {
// //       setTripStatus("Join Trip");
// //     }
// //   }, [currentUserAsPassenger]);

// //   console.log("Current user as passenger:", currentUserAsPassenger);

// //   // const [currentUserAsPassenger, setCurrentUserAsPassenger] = useState(null);

// //   // useEffect(() => {
// //   // const currentUserPassenger = passengers?.find(
// //   //   (p) => p.username === user.username
// //   // );
// //   //   setCurrentUserAsPassenger(currentUserPassenger);
// //   // }, [passengers, user]);

// //   // const tripStatus = currentUserAsPassenger
// //   //   ? currentUserAsPassenger.reservationStatus
// //   //   : "Join Trip";

// //   console.log("trip Status:", tripStatus);

// //   // const handleJoinRequest = async (tripId) => {
// //   //   try {
// //   //     const newJoinRequest = await PassengerApi.requestToJoin(tripId);

// //   //     setCurrentUserAsPassenger(newJoinRequest);

// //   //     toast.success("Successfully joined the trip!");
// //   //   } catch (error) {
// //   //     console.error(error);
// //   //     toast.error("Failed to join the trip");
// //   //   }
// //   // };

// //   const handleDeleteTripAsOwner = async () => {
// //     try {
// //       await PassengerApi.deleteTrip(tripId);
// //       setAllTrips((prevTrips) => prevTrips.filter((t) => t.id !== tripId));

// //       toast.success("Successfully deleted trip!");
// //       navigate(-1);
// //     } catch (error) {
// //       console.error(error);
// //       toast.error("Failed to delete the trip");
// //     }
// //   };

// //   const handleBack = () => {
// //     navigate(-1);
// //   };

// //   return (
// //     <Card variant="outlined">
// //       <CardContent>
// //         <Typography variant="h6" gutterBottom>
// //           {trip.startLocation} - {trip.destination}
// //         </Typography>

// //         <Typography color="text.secondary">
// //           <Box component="span">Stops: {trip.stops}</Box>
// //         </Typography>

// //         {passengers && passengers.length > 0 && (
// //           <Typography color="text.secondary">
// //             Passengers:{" "}
// //             {passengers.map((p) => (
// //               <Box
// //                 key={p.username}
// //                 sx={{ display: "flex", justifyContent: "space-between" }}
// //               >
// //                 <Typography>{p.username}</Typography>
// //                 <Typography>{p.status}</Typography>
// //               </Box>
// //             ))}
// //           </Typography>
// //         )}
// //       </CardContent>

// //       <CardActions>
// //         (
// //         <Button
// //           size="small"
// //           variant="outlined"
// //           onClick={() => handleJoinRequest(tripId)}
// //         >
// //           {tripStatus}
// //         </Button>
// //         )
// //         <Button size="small" onClick={handleBack} variant="outlined">
// //           Go Back
// //         </Button>
// //         <Button
// //           sx={{ color: trip.owner === user.username ? "red" : "green" }}
// //           size="small"
// //           variant="text"
// //         >
// //           {trip.owner === user.username ? "owner" : ""}
// //         </Button>
// //         {trip.owner === user.username && (
// //           <Button
// //             onClick={handleDeleteTripAsOwner}
// //             sx={{ color: "red" }}
// //             size="small"
// //             variant="text"
// //           >
// //             ❌
// //           </Button>
// //         )}
// //         {currentUserAsPassenger && (
// //           <FavoriteButton size="small" onClick={() => handleFavorite(tripId)}>
// //             <FavoriteTwoToneIcon />
// //           </FavoriteButton>
// //         )}
// //       </CardActions>
// //     </Card>
// //   );
// // };

// // export default TripCardDetails;

// // $$$

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   CardActions,
//   Button,
//   Typography,
//   styled,
// } from "@mui/material";
// import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
// import { useAuthContext } from "../../context/authProvider";
// import { useNavigate } from "react-router-dom";
// import * as PassengerApi from "../../api/services/PassengerApi";
// import { toast } from "react-toastify";
// import { useTripData } from "../../hooks/useTripData";

// const FavoriteButton = styled(Button)(({ theme }) => ({
//   color: theme.palette.error.main,
// }));

// const TripCardDetails = ({ trip, passengers, handleJoinRequest }) => {
//   const { user } = useAuthContext();
//   const { setAllTrips } = useTripData();
//   const navigate = useNavigate();
//   const [tripStatus, setTripStatus] = useState("Join Trip");

//   const currentUserAsPassenger = passengers.find(
//     (p) => p.username === user.username
//   );

//   useEffect(() => {
//     if (currentUserAsPassenger) {
//       setTripStatus(currentUserAsPassenger.reservationStatus);
//     } else {
//       setTripStatus("Join Trip");
//     }
//   }, [currentUserAsPassenger]);

//   const handleDeleteTripAsOwner = async () => {
//     try {
//       await PassengerApi.deleteTrip(trip.id);
//       setAllTrips((prevTrips) => prevTrips.filter((t) => t.id !== trip.id));
//       toast.success("Successfully deleted trip!");
//       navigate(-1);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to delete the trip");
//     }
//   };

//   const handleBack = () => {
//     navigate(-1);
//   };

//   return (
//     <Card variant="outlined">
//       <CardContent>
//         <Typography variant="h6" gutterBottom>
//           {trip.startLocation} - {trip.destination}
//         </Typography>

//         <Typography color="text.secondary">
//           <Box component="span">Stops: {trip.stops}</Box>
//         </Typography>

//         {passengers && passengers.length > 0 && (
//           <Typography color="text.secondary">
//             Passengers:{" "}
//             {passengers.map((p) => (
//               <Box
//                 key={p.username}
//                 sx={{ display: "flex", justifyContent: "space-between" }}
//               >
//                 <Typography>{p.username}</Typography>
//                 <Typography>{p.status}</Typography>
//               </Box>
//             ))}
//           </Typography>
//         )}
//       </CardContent>

//       <CardActions>
//         <Button
//           size="small"
//           variant="outlined"
//           onClick={() => handleJoinRequest(trip.id)}
//         >
//           {tripStatus}
//         </Button>
//         <Button size="small" onClick={handleBack} variant="outlined">
//           Go Back
//         </Button>
//         <Button
//           sx={{ color: trip.owner === user.username ? "red" : "green" }}
//           size="small"
//           variant="text"
//         >
//           {trip.owner === user.username ? "owner" : ""}
//         </Button>
//         {trip.owner === user.username && (
//           <Button
//             onClick={handleDeleteTripAsOwner}
//             sx={{ color: "red" }}
//             size="small"
//             variant="text"
//           >
//             ❌
//           </Button>
//         )}
//         {currentUserAsPassenger && (
//           <FavoriteButton size="small" onClick={() => handleFavorite(trip.id)}>
//             <FavoriteTwoToneIcon />
//           </FavoriteButton>
//         )}
//       </CardActions>
//     </Card>
//   );
// };

// export default TripCardDetails;
