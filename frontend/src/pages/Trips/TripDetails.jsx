import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import { styled } from "@mui/material";

import * as TripApi from "../../api/services/TripApi";
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import { TripCardDetails } from "./TripCardDetails";
import * as PassengerApi from "../../api/services/PassengerApi";
import * as UserApi from "../../api/services/UserApi";
import { useAuthContext } from "../../context/authProvider";

export const TripDetails = () => {
  // use the show the error in async function (ERROR BOUNDARY LIMITATIONS)
  const { showBoundary } = useErrorBoundary();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [tripPassengers, setTripPassengers] = useState(null);
  const [loadingTrips, setIsLoadingTrips] = useState(true);
  const [userReservation, setUserReservation] = useState(null);
  const [loadingUserReservation, setIsLoadingUserReservation] = useState(true);
  const myTripData = location.state?.myTripData;

  const FavoriteButton = styled(Button)(({ theme }) => ({}));

  if (myTripData) {
    return (
      <>
        <Box>
          <TripCardDetails trip={myTripData} />
        </Box>
      </>
    );
  }

  useEffect(() => {
    const getTripDetails = async () => {
      try {
        const tripDetails = await TripApi.getOneTrip(tripId);
        if (!tripDetails) {
          toast.error("Trip not found. Please check the provided ID.");
          navigate(-1);
          // redirect
        }
        setTrip(tripDetails);
        setIsLoadingTrips(false);
      } catch (error) {
        setIsLoadingTrips(false);
        console.error("Error fetching trip:", error);
      }
    };

    getTripDetails();
  }, [tripId]);

  const handleJoinRequest = async (tripId) => {
    try {
      console.log("Request to join. NOT IMPLEMENTED");
      const newJoinRequest = await PassengerApi.requestToJoin(tripId);
      //   setTrip((prevTrip) => {
      //     const updatedTrip = { ...prevTrip };
      //   });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!loadingTrips && trip ? (
        <Box>
          <TripCardDetails trip={trip} handleJoinRequest={handleJoinRequest} />
        </Box>
      ) : (
        <Box>Loading...</Box>
      )}
    </>
  );
};

useEffect(() => {
  const getTripPassengersData = async () => {
    try {
      const tripPassengers = await PassengerApi.getTripPassengers(tripId);
      setTripPassengers();
    } catch (error) {
      console.error(error);
    }
  };
  getTripPassengersData();
}, []);

// $$$
//
//   useEffect(() => {
//     const getUserReservation = async () => {
//       try {
//         if (user) {
//           const userReservation = await UserApi.getOneUserReservation(
//             user.username,
//             tripId
//           );
//           //   console.log("userReservation", userReservation);
//           setUserReservation(userReservation);
//           setIsLoadingUserReservation(false);
//         }
//       } catch (error) {
//         setIsLoadingUserReservation(false);
//         showBoundary(error);
//         console.error("Error fetching reservation:", error);
//       }
//     };

//     if (!trip) {
//       // Trip is still loading, wait for it to finish loading
//       return;
//     }

//     if (trip && trip.owner !== user.username) {
//       getUserReservation();
//     } else {
//       setIsLoadingUserReservation(false);
//       return;
//     }
//   }, [tripId, user, trip]);

//   return (
//     <>
//       {!loadingTrips && !loadingUserReservation ? (
//         <Box>
//           <TripCardDetails data={trip} reservation={userReservation} />
//         </Box>
//       ) : (
//         <Box>Loading...</Box>
//       )}
//     </>
//   );
