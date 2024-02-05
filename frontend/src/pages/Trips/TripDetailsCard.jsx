import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  styled,
  Chip,
} from "@mui/material";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import { useLocation, useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { Confirmation } from "./Confirmation";
import { theme } from "../../utils/theme";
import { StatusChip } from "../../components/ui/StatusChip";
import { CancelRequestConfirmationCard } from "../../components/confirmationCards/CancelRequestConfirmationCard";
import { JoinRequestConfirmationCard } from "../../components/confirmationCards/JoinRequestConfirmationCard";
import { FavoriteButton } from "../../styles/buttonStyles";
import { StyledDetailsCard } from "../../styles/cardStyles";
import { useFavorite } from "../../hooks/useFavorite";
import { useParams } from "react-router-dom";

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

  return (
    <>
      <Typography variant="h4">Trip I'm Joining</Typography>

      <StyledDetailsCard variant="outlined">
        {isInMyTrips && <StatusChip isTripOwner={false} />}

        {!isInMyTrips && (
          <FavoriteButton onClick={handleFavorite} color="secondary">
            {isFavorited ? (
              <FavoriteIcon style={{ cursor: "pointer" }} />
            ) : (
              <FavoriteBorderSharpIcon style={{ cursor: "pointer" }} />
            )}
          </FavoriteButton>
        )}

        <CardContent>
          <Typography variant="h5">Trip Details</Typography>
          <Typography variant="body1" gutterBottom>
            Start Location: {tripDetails.startLocation}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Destination: {tripDetails.destination}
          </Typography>

          <Typography color="text.secondary">
            Stops: {tripDetails.stops}
          </Typography>

          <Typography variant="h6">Passengers</Typography>

          {passengers && passengers.length > 0 && (
            <Box>
              {passengers.map((p) => (
                <Box
                  key={p.username + p.trip_id}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography>{p.username}</Typography>
                  <Typography>Status: {p.reservationStatus}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </CardContent>

        <CardActions>
          <Button onClick={openConfirmation}>
            {userStatus ? "Cancel Trip" : "Join Trip"}
          </Button>

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

          <Button size="small" onClick={() => navigate(-1)} variant="outlined">
            Go Back
          </Button>
        </CardActions>
      </StyledDetailsCard>
      {userStatus && (
        <Box>
          <Typography variant="h5">My Status</Typography>
        </Box>
      )}
    </>
  );
};
