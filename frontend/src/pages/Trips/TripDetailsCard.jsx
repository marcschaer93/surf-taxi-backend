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
} from "@mui/material";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";

import { useLocation, useNavigate } from "react-router-dom";

import { Confirmation } from "./Confirmation";
import { theme } from "../../utils/theme";
import { StatusChip } from "../../components/ui/StatusChip";
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

export const TripDetailsCard = ({
  tripDetails,
  passengers,
  handleGoBack,
  handleConfirmCancel,
  handleConfirmJoin,
  userStatus,
  showConfirmation,
  openConfirmation,
  closeConfirmation,
}) => {
  const location = useLocation();
  const { tripId } = useParams();

  const navigate = useNavigate();
  const isInMyTrips = location.state?.isInMyTrips;

  const { isFavorited, toggleFavorite, loading } = useFavorite(tripId);

  const handleFavorite = (e, tripId) => {
    e.stopPropagation();
    toggleFavorite(tripId);
  };

  const handleGoBackButton = (e, tripId) => {
    e.stopPropagation();
    navigate(-1);
  };

  const { startLocation, destination, stops, seats, date, travelInfo, owner } =
    tripDetails;

  return (
    <>
      <Box>
        <GoBackButton handleGoBack={handleGoBackButton} />
        <Title variant="h3">Trip Details</Title>
        <TitleDivider />
      </Box>

      <StyledDetailsCard variant="outlined">
        {isInMyTrips && <StatusChip isTripOwner={false} />}

        {!isInMyTrips && (
          <FavoriteButton
            handleFavorite={handleFavorite}
            isFavorited={isFavorited}
          ></FavoriteButton>
        )}

        <TripCardContent tripData={tripDetails} />

        <CardActions>
          <Box>
            {userStatus ? (
              <CancelRequestConfirmationCard
                open={showConfirmation}
                onClose={closeConfirmation}
                tripDetails={tripDetails}
                handleConfirmCancel={handleConfirmCancel}
                handleGoBack={handleGoBack}
              />
            ) : (
              <JoinRequestConfirmationCard
                open={showConfirmation}
                onClose={closeConfirmation}
                tripDetails={tripDetails}
                handleConfirmJoin={handleConfirmJoin}
                handleGoBack={handleGoBack}
              />
            )}
          </Box>
        </CardActions>
      </StyledDetailsCard>

      {/* Trip Owner */}
      <Box>
        <TitleDivider />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5">Owner</Typography>
          <ColorAvatar username={owner} />
        </Box>
      </Box>

      {/* User Trip Status */}
      {userStatus && (
        <Box>
          <TitleDivider />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5">My Status</Typography>
            <StatusChip isTripOwner={false} status={userStatus} />
            <Typography variant="h5">{userStatus}</Typography>
          </Box>
        </Box>
      )}

      <TitleDivider />

      <Box>
        <Typography variant="h5">Passengers</Typography>
        <PassengerAvatars passengers={passengers} />
      </Box>

      {/* Bottom action bar */}
      <BottomActionBar
        variant={userStatus ? "contained" : "contained"}
        color={userStatus ? "error" : "primary"}
        onClick={openConfirmation}
        buttonText={userStatus ? "Cancel Trip" : "Join Trip"}
      />
    </>
  );
};
