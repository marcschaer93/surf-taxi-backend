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

const FavoriteButton = styled(Button)(({ theme }) => ({
  color: theme.palette.error.main,
}));

export const TripCardDetails = ({
  trip,
  handleFavorite,
  handleJoinRequest,
}) => {
  const {
    startLocation,
    destination,
    data,
    stops,
    owner,
    travelInfo,
    costs,
    passengers,
    // Add other relevant properties from your trip data
  } = trip;

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {startLocation} - {destination}
        </Typography>

        <Typography color="text.secondary">
          <Box component="span">Stops: {stops}</Box>
        </Typography>

        {/* Add other trip details here */}

        <CardActions>
          <Button size="small" onClick={() => handleJoinRequest(trip.id)}>
            Join Trip
          </Button>

          <FavoriteButton size="small" onClick={handleFavorite}>
            <FavoriteTwoToneIcon />
          </FavoriteButton>
        </CardActions>
      </CardContent>
    </Card>
  );
};
