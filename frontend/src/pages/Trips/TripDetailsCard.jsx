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
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import { useLocation } from "react-router-dom";

const StyledCard = styled(Card)(({ theme, isTripOwner }) => ({
  position: "relative",
  borderColor: isTripOwner
    ? theme.palette.contrast.main
    : theme.palette.grey[800],
  borderWidth: "0.5px",
  cursor: "pointer",
  transition: "background 0.3s ease",
  margin: "20px 0", // Add margin to create space between cards
  width: "100%",

  "&:hover": {
    background: theme.palette.action.hover,
  },
}));

const OwnerStatusChip = styled(Chip)({
  position: "absolute",
  top: 18, // Adjust the top value as needed
  right: 18, // Adjust the right value as needed
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
  const isUserTrip = location.state?.isUserTrip;
  console.log("isUserTrip", isUserTrip);

  return (
    <>
      <StyledCard variant="outlined">
        {isUserTrip && (
          <OwnerStatusChip
            label="Passenger"
            color="primary"
            variant="filled"
            size="small"
          />
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
          {/* <Button
              sx={{ color: trip.owner === user.username ? "red" : "green" }}
              size="small"
              variant="text"
            >
              {trip.owner === user.username ? "owner" : ""}
            </Button>
            {trip.owner === user.username && (
              <Button
                onClick={handleDeleteTripAsOwner}
                sx={{ color: "red" }}
                size="small"
                variant="text"
              >
                ❌
              </Button>
            )}
            {currentUserAsPassenger && (
              <FavoriteButton
                size="small"
                onClick={() => handleFavorite(tripId)}
              >
                <FavoriteTwoToneIcon />
              </FavoriteButton>
            )} */}{" "}
          <CardActions>
            {!isUserTrip && (
              <FavoriteBorderSharpIcon
                color="secondary"
                onClick={(e) => handleFavorite(e)}
                style={{ cursor: "pointer" }}
              />
            )}
          </CardActions>
        </CardActions>
      </StyledCard>
    </>
  );
};
