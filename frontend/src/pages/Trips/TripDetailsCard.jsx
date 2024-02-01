import { Confirmation } from "./Confirmation";
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
import { useLocation } from "react-router-dom";
import { theme } from "../../utils/theme";
import { StatusChip } from "../../components/ui/StatusChip";

const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative",
  borderWidth: "0.5px",
  cursor: "pointer",
  transition: "background 0.3s ease",
  margin: "20px 0", // Add margin to create space between cards
  width: "100%",

  "&:hover": {
    background: theme.palette.action.hover,
  },
}));

const FavoriteButton = styled(Box)({
  position: "absolute",
  top: 18,
  right: 18,
  fontSize: "8px",
  fontWeight: "bold",
});

export const TripDetailsCard = ({
  tripDetails,
  passengers,
  isTripOwner,
  handleGoBack,
  handleConfirmCancel,
  handleBack,
  handleConfirmJoin,
  userStatus,
  handleJoinTrip,
  showConfirmation,
}) => {
  const location = useLocation();
  const isInMyTrips = location.state?.isInMyTrips;

  const handleFavorite = (e, tripId) => {
    e.stopPropagation();
    console.log(`added trip with id: ${tripId} to favorites. NOT IMPLEMENTED`);
  };

  return (
    <>
      <StyledCard
        variant="outlined"
        sx={{
          borderColor: isTripOwner
            ? theme.palette.contrast.main
            : theme.palette.grey[800],
        }}
      >
        {isInMyTrips && <StatusChip isTripOwner={isTripOwner} />}

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
          {!isTripOwner && (
            <>
              {userStatus ? (
                <Button onClick={handleJoinTrip}>Cancel Trip</Button>
              ) : (
                <Button onClick={handleJoinTrip}>Join Trip</Button>
              )}

              {showConfirmation && (
                <Confirmation
                  tripDetails={tripDetails}
                  onConfirm={handleConfirmJoin}
                  onCancel={handleConfirmCancel}
                  onGoBack={handleGoBack}
                  userStatus={userStatus}
                />
              )}
            </>
          )}
          <Button size="small" onClick={handleBack} variant="outlined">
            Go Back
          </Button>
        </CardActions>
      </StyledCard>
    </>
  );
};
