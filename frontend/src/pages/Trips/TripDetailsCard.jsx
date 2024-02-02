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
import { useLocation, useNavigate } from "react-router-dom";
import { theme } from "../../utils/theme";
import { StatusChip } from "../../components/ui/StatusChip";
import { CancelRequestConfirmationCard } from "../../components/confirmationCards/CancelRequestConfirmationCard";
import { JoinRequestConfirmationCard } from "../../components/confirmationCards/JoinRequestConfirmationCard";

const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative",
  borderWidth: "1px", // Increase border width for a more prominent look
  borderRadius: theme.shape.borderRadius, // Use the theme's border radius for consistency
  overflow: "hidden", // Hide overflow for better aesthetics
  cursor: "pointer",
  transition: "background 0.3s ease, transform 0.3s ease",
  margin: "20px 0", // Add margin to create space between cards
  width: "100%",
  "&:hover": {
    background: theme.palette.action.hover,
    transform: "scale(1.02)", // Scale the card slightly on hover for a subtle effect
    boxShadow: `0 5px 15px rgba(0, 0, 0, 0.2)`, // Add a shadow on hover
  },
  "&:active": {
    transform: "scale(0.98)", // Shrink the card slightly on click
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

  console.log("USERSTATUS", userStatus);

  return (
    <>
      <StyledCard variant="outlined">
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
      </StyledCard>
    </>
  );
};
