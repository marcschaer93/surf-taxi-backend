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

import { Confirmation } from "./Confirmation";
import { theme } from "../../utils/theme";
import { StatusChip } from "../../components/ui/StatusChip";
import { CancelRequestConfirmationCard } from "../../components/confirmationCards/CancelRequestConfirmationCard";
import { JoinRequestConfirmationCard } from "../../components/confirmationCards/JoinRequestConfirmationCard";
import { FavoriteButton } from "../../styles/buttonStyles";
import { StyledDetailsCard } from "../../styles/cardStyles";

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
  const navigate = useNavigate();
  const isInMyTrips = location.state?.isInMyTrips;

  const handleFavorite = (e, tripId) => {
    e.stopPropagation();
    console.log(`added trip with id: ${tripId} to favorites. NOT IMPLEMENTED`);
  };

  return (
    <>
      <StyledDetailsCard variant="outlined">
        {isInMyTrips && <StatusChip isTripOwner={false} />}

        {!isInMyTrips && (
          <FavoriteButton>
            <FavoriteBorderSharpIcon
              color="secondary"
              onClick={(e) => handleFavorite(e)}
              style={{ cursor: "pointer" }}
            />
          </FavoriteButton>
        )}

        <CardContent>
          <Typography variant="h4">Trip Details</Typography>
          <Typography variant="body1" gutterBottom>
            Start Location: {tripDetails.startLocation}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Destination: {tripDetails.destination}
          </Typography>

          <Typography color="text.secondary">
            Stops: {tripDetails.stops}
          </Typography>

          <Typography variant="h5">Passengers</Typography>

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
    </>
  );
};
