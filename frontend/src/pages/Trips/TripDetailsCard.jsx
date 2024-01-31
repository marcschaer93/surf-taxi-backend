import { Confirmation } from "./Confirmation";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  styled,
} from "@mui/material";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";

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
  return (
    <>
      <Card variant="outlined">
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
            )} */}
        </CardActions>
      </Card>
    </>
  );
};
