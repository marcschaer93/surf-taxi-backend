import { Confirmation } from "./Confirmation";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  styled,
  Paper,
  Chip,
} from "@mui/material";
import { theme } from "../../utils/theme";
import { StatusChip } from "../../components/ui/StatusChip";
import { useNavigate } from "react-router-dom";
import { CancelRequestConfirmationCard } from "../../components/confirmationCards/CancelRequestConfirmationCard";
import { JoinRequestConfirmationCard } from "../../components/confirmationCards/JoinRequestConfirmationCard";
import { DeleteOwnTripConfirmationCard } from "../../components/confirmationCards/DeleteOwnTripConfirmationCard";

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

export const OwnerTripDetailsCard = ({
  tripDetails,
  passengers,
  handleGoBack,
  handleConfirmDelete,
  showConfirmation,
  openConfirmation,
  closeConfirmation,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <StyledCard variant="outlined">
        <StatusChip isTripOwner={true} />
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

          <Box>
            {passengers && passengers.length > 0 ? (
              passengers.map((p) => (
                <Box
                  key={p.username + p.trip_id}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography>{p.username}</Typography>
                  <Typography>Status: {p.reservationStatus}</Typography>
                </Box>
              ))
            ) : (
              <Typography>No Passengers</Typography>
            )}
          </Box>
        </CardContent>
        <CardActions>
          <Button onClick={openConfirmation}>Delete Trip</Button>
          <Button size="small" onClick={() => navigate(-1)} variant="outlined">
            Go Back
          </Button>
        </CardActions>
        <Box>
          <DeleteOwnTripConfirmationCard
            tripDetails={tripDetails}
            handleConfirmDelete={handleConfirmDelete}
            handleGoBack={handleGoBack}
            open={showConfirmation}
            onClose={closeConfirmation}
          />
        </Box>
      </StyledCard>
    </>
  );
};
