import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  styled,
  Chip,
  Avatar,
  IconButton,
  CircularProgress,
} from "@mui/material";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";

import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useState } from "react";

import { Confirmation } from "./Confirmation";
import { theme } from "../../utils/theme";
import { CardStatusChip } from "../../components/ui/CardStatusChip";
import { CancelRequestConfirmationCard } from "../../components/confirmationCards/CancelRequestConfirmationCard";
import { JoinRequestConfirmationCard } from "../../components/confirmationCards/JoinRequestConfirmationCard";
import { StyledDetailsCard } from "../../styles/cardStyles";
import { useFavorite } from "../../hooks/useFavorite";
import { useParams } from "react-router-dom";
import { Title, TitleDivider } from "../../styles/fontStyles";

import { FavoriteButton } from "../../components/ui/FavoriteButton";
import { GoBackButton } from "../../components/ui/GoBackButton";
import { TripCardContent } from "./TripCardContent";
import { PassengerCard } from "./PassengerCard";
import { PassengerAvatars } from "../../components/ui/PassengerAvatars";
import { BottomActionBar } from "../../components/BottomActionBar";
import { ColorAvatar } from "../../components/ui/ColorAvatar";
import { StatusChip } from "../../components/ui/StatusChip";
import InfoSharpIcon from "@mui/icons-material/InfoSharp";

export const TripDetailsCard = ({
  tripDetails,
  passengers,
  userReservation,
  handleAction,
}) => {
  const location = useLocation();
  const { tripId } = useParams();

  const navigate = useNavigate();
  const isInMyTrips = location.state?.isInMyTrips;

  const { isFavorited, toggleFavorite, loading } = useFavorite(tripId);

  const [showJoinConfirmation, setShowJoinConfirmation] = useState(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);

  const openJoinConfirmation = () => {
    setShowJoinConfirmation(true);
  };

  const openCancelConfirmation = () => {
    setShowCancelConfirmation(true);
  };

  const closeJoinConfirmation = () => {
    setShowJoinConfirmation(false);
  };

  const closeCancelConfirmation = () => {
    setShowCancelConfirmation(false);
  };

  const handleFavorite = (e, tripId) => {
    e.stopPropagation();
    toggleFavorite(tripId);
  };

  const handleGoBackButton = (e, tripId) => {
    e.stopPropagation();
    navigate(-1);
  };

  const handleAvatarClick = (username) => {
    console.log("username", username);
    // navigate(`users/${owner}`);
  };

  const { startLocation, destination, stops, seats, date, travelInfo, owner } =
    tripDetails;

  if (loading) return <CircularProgress />;

  return (
    <>
      <Box>
        <GoBackButton handleGoBack={handleGoBackButton} />
        <Title variant="h3">Trip Details</Title>
        <TitleDivider />
      </Box>

      <StyledDetailsCard variant="outlined">
        {isInMyTrips && <CardStatusChip isTripOwner={false} />}

        {!isInMyTrips && (
          <FavoriteButton
            handleFavorite={handleFavorite}
            isFavorited={isFavorited}
          ></FavoriteButton>
        )}

        <TripCardContent tripDetails={tripDetails} />

        <CardActions>
          <Box>
            {!userReservation && showJoinConfirmation && (
              <JoinRequestConfirmationCard
                open={showJoinConfirmation}
                onClose={closeJoinConfirmation}
                tripDetails={tripDetails}
                handleAction={handleAction}
              />
            )}

            {userReservation && showCancelConfirmation && (
              <CancelRequestConfirmationCard
                open={showCancelConfirmation}
                onClose={closeCancelConfirmation}
                tripDetails={tripDetails}
                handleAction={handleAction}
              />
            )}
          </Box>
        </CardActions>
      </StyledDetailsCard>

      {/* User Trip Status */}
      {userReservation && (
        <Box>
          <TitleDivider />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Box sx={{ display: "flex", gap: "10px" }}>
                <Typography variant="h5">My Status</Typography>
                <InfoSharpIcon />
              </Box>
              <Typography variant="body2">
                {`Last modified: ${format(
                  userReservation.reservationTimestamp,
                  "yyyy-MM-dd "
                )}`}
              </Typography>
            </Box>
            <StatusChip
              sx={{}}
              isTripOwner={false}
              status={userReservation.reservationStatus}
            />
          </Box>
        </Box>
      )}

      {/* Trip Organizer */}
      <Box>
        <TitleDivider />
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5">Trip Organizer</Typography>
          <ColorAvatar username={owner} handleAvatarClick={handleAvatarClick} />
        </Box>
      </Box>

      {/* Passengers */}
      <Box sx={{ marginBottom: "80px" }}>
        <TitleDivider />
        <Typography variant="h5">Reserved Seats</Typography>
        <PassengerAvatars passengers={passengers} />
      </Box>

      {/* Bottom action bar */}
      <BottomActionBar
        variant={userReservation ? "contained" : "contained"}
        color={userReservation ? "error" : "primary"}
        onClick={
          userReservation ? openCancelConfirmation : openJoinConfirmation
        }
        buttonText={userReservation ? "Cancel Trip" : "Join Trip"}
      />
    </>
  );
};
