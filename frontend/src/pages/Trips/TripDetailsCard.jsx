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
import { useState, useEffect } from "react";

import { Confirmation } from "./Confirmation";
import { theme } from "../../utils/theme";
// import { CardStatusChip } from "../../components/ui/CardStatusChip";
import { CancelRequestConfirmationCard } from "../../components/confirmationCards/CancelRequestConfirmationCard";
import { JoinRequestConfirmationCard } from "../../components/confirmationCards/JoinRequestConfirmationCard";
import { StyledDetailsCard } from "../../styles/cardStyles";
import { useToggleFavoriteTrip } from "../../hooks/useToggleFavoriteTrip";
import { useParams } from "react-router-dom";
import { Title, TitleDivider } from "../../styles/fontStyles";

import { FavoriteButton } from "../../components/ui/FavoriteButton";
import { GoBackButton } from "../../components/ui/GoBackButton";
import { TripCardContent } from "./TripCardContent";
import { ReservationCard } from "./ReservationCard";
import { ReservationAvatars } from "../../components/ui/PassengerAvatars";
import { BottomActionBar } from "../../components/BottomActionBar";
import { ColorAvatar } from "../../components/ui/ColorAvatar";
import { StatusChip } from "../../components/ui/StatusChip";
import InfoSharpIcon from "@mui/icons-material/InfoSharp";
import { useMyTripsContext } from "../../context/MyTripsProvider";
import { useAuthContext } from "../../context/authProvider";
import TripPreviewCard from "./TripPreviewCard";
import { StatusInfoDialog } from "./StatusInfoDialog";

export const TripDetailsCard = ({
  tripDetails,
  reservations,
  handleAction,
}) => {
  const { user } = useAuthContext();
  const { myTrips } = useMyTripsContext();
  const location = useLocation();
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { isFavorited, toggleFavorite, loading } =
    useToggleFavoriteTrip(tripId);
  const [showJoinConfirmation, setShowJoinConfirmation] = useState(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [showStatusInfoDialog, setShowStatusInfoDialog] = useState(false);
  const [userReservation, setUserReservation] = useState(null);

  useEffect(() => {
    const currentUserAsReservation = reservations?.find(
      (r) => r.username === user.username
    );
    if (currentUserAsReservation) {
      setUserReservation(currentUserAsReservation);
    }
  }, [reservations, user]);

  const isInMyTrips = myTrips.some((t) => t.id === parseInt(tripId));

  const openStatusInfoDialog = () => setShowStatusInfoDialog(true);
  const closeStatusInfoDialog = () => setShowStatusInfoDialog(false);

  const openJoinConfirmation = () => setShowJoinConfirmation(true);
  const openCancelConfirmation = () => setShowCancelConfirmation(true);
  const closeJoinConfirmation = () => setShowJoinConfirmation(false);
  const closeCancelConfirmation = () => setShowCancelConfirmation(false);

  const handleFavorite = (e, tripId) => {
    e.stopPropagation();
    toggleFavorite(tripId);
  };

  const handleGoBackButton = (e, tripId) => {
    e.stopPropagation();
    isInMyTrips ? navigate("/my-trips") : navigate("/trips");
  };

  const handleAvatarClick = (username) => {
    console.log("username", username);
    // navigate(`users/${owner}`);
  };

  if (loading) return <CircularProgress />;

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <GoBackButton handleGoBack={handleGoBackButton} />

        {isInMyTrips ? (
          <Title variant="h3">Trip I'm Joining</Title>
        ) : (
          <Title variant="h3">Trip Details</Title>
        )}

        <TitleDivider />
        {!isInMyTrips && (
          <FavoriteButton
            handleFavorite={handleFavorite}
            isFavorited={isFavorited}
          ></FavoriteButton>
        )}
      </Box>

      {/* <StyledDetailsCard variant="outlined"> */}
      {/* {userReservation && <CardStatusChip isTripOwner={false} />} */}

      {/* {!userReservation && ( */}
      {/* )} */}

      <TripCardContent tripDetails={tripDetails} />

      <CardActions>
        <Box>
          {!isInMyTrips && showJoinConfirmation && (
            <JoinRequestConfirmationCard
              open={showJoinConfirmation}
              onClose={closeJoinConfirmation}
              tripDetails={tripDetails}
              handleAction={handleAction}
            />
          )}

          {isInMyTrips && showCancelConfirmation && (
            <CancelRequestConfirmationCard
              open={showCancelConfirmation}
              onClose={closeCancelConfirmation}
              tripDetails={tripDetails}
              handleAction={handleAction}
            />
          )}
        </Box>
      </CardActions>
      {/* </StyledDetailsCard> */}

      {/* User Trip Status */}
      {userReservation && (
        <Box>
          <TitleDivider />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Typography variant="h5" component="span">
                  My Status
                </Typography>

                {/* Status Info Button */}
                <IconButton
                  onClick={openStatusInfoDialog}
                  color="primary"
                  sx={{ padding: 0, marginTop: "-4px" }}
                >
                  <InfoSharpIcon />
                </IconButton>
                {/* StatusInfoDialog */}
                <StatusInfoDialog
                  open={showStatusInfoDialog}
                  onClose={closeStatusInfoDialog}
                  currentStatus={userReservation.status}
                />
              </Box>
              <Typography variant="body2">
                {`Last modified: ${format(
                  userReservation.reservationTimestamp,
                  "dd MMMM, yyyy"
                )}`}
              </Typography>
            </Box>
            <StatusChip isTripOwner={false} status={userReservation.status} />
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
          <ColorAvatar
            username={tripDetails.owner}
            handleAvatarClick={handleAvatarClick}
          />
        </Box>
      </Box>

      {/* Reservations */}
      <Box sx={{ marginBottom: "80px" }}>
        <TitleDivider />
        <Typography variant="h5">Reserved Seats</Typography>
        <ReservationAvatars reservations={reservations} />
      </Box>

      {/* Bottom action bar */}
      <BottomActionBar
        variant={isInMyTrips ? "contained" : "contained"}
        color={isInMyTrips ? "error" : "primary"}
        onClick={isInMyTrips ? openCancelConfirmation : openJoinConfirmation}
        buttonText={isInMyTrips ? "Cancel Trip" : "Join Trip"}
      />
    </>
  );
};
