import { Confirmation } from "./Confirmation";
import { format } from "date-fns";

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
  IconButton,
} from "@mui/material";
import { theme } from "../../utils/theme";
// import { CardStatusChip } from "../../components/ui/CardStatusChip";
import { useNavigate } from "react-router-dom";
import { CancelRequestConfirmationCard } from "../../components/confirmationCards/CancelRequestConfirmationCard";
import { JoinRequestConfirmationCard } from "../../components/confirmationCards/JoinRequestConfirmationCard";
import { DeleteOwnTripConfirmationCard } from "../../components/confirmationCards/DeleteOwnTripConfirmationCard";
import { StyledDetailsCard } from "../../styles/cardStyles";
import { ReservationCard } from "./ReservationCard";
import { Title, TitleDivider } from "../../styles/fontStyles";
import { GoBackButton } from "../../components/ui/GoBackButton";
import { useState } from "react";
import { TripCardContent } from "./TripCardContent";
import { BottomActionBar } from "../../components/BottomActionBar";
import { ReservationAvatars } from "../../components/ui/PassengerAvatars";
import { StatusChip } from "../../components/ui/StatusChip";
import InfoSharpIcon from "@mui/icons-material/InfoSharp";
import { StatusInfoDialog } from "./StatusInfoDialog";

export const OrganizerTripDetailsCard = ({
  tripDetails,
  reservations,
  handleAction,
}) => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const openConfirmation = () => setShowConfirmation(true);
  const closeConfirmation = () => setShowConfirmation(false);
  const handleGoBackButton = (e, tripId) => {
    e.stopPropagation();
    navigate("/my-trips");
  };

  const notConfirmedReservations = reservations.filter(
    (r) => r.status !== "confirmed"
  );

  const [showStatusInfoDialog, setShowStatusInfoDialog] = useState(false);

  const openStatusInfoDialog = () => setShowStatusInfoDialog(true);
  const closeStatusInfoDialog = () => setShowStatusInfoDialog(false);

  return (
    <>
      <Box sx={{ marginBottom: "80px" }}>
        <Box>
          <GoBackButton handleGoBack={handleGoBackButton} />
          <Title variant="h3">My Organized Trip</Title>
          <TitleDivider />
        </Box>

        {/* <StyledDetailsCard variant="outlined"> */}
        {/* <Box sx={{ position: "absolute", top: 18, right: 18 }}>
            <StatusChip isTripOwner={true} status={"organizer"} />
          </Box> */}

        <TripCardContent tripDetails={tripDetails} />

        <Box>
          {showConfirmation && (
            <DeleteOwnTripConfirmationCard
              tripDetails={tripDetails}
              open={showConfirmation}
              onClose={closeConfirmation}
              handleAction={handleAction}
            />
          )}
        </Box>

        {/* User Trip Status */}
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
                  currentStatus="organizer"
                />
              </Box>
              {/* <Typography variant="body2">
                {`Last modified: ${format(
                  userReservation.reservationTimestamp,
                  "dd MMMM, yyyy"
                )}`}
              </Typography> */}
            </Box>
            <StatusChip isTripOwner={false} status={"organizer"} />
          </Box>
        </Box>

        <TitleDivider />

        {/* </StyledDetailsCard> */}

        {/* Requests */}
        <Box>
          <Typography variant="h5">My Requests</Typography>
          {notConfirmedReservations && notConfirmedReservations.length > 0 ? (
            notConfirmedReservations.map((r) => (
              <ReservationCard
                key={`${r.username} + ${r.trip_id}`}
                tripDetails={tripDetails}
                reservation={r}
                handleAction={handleAction}
              />
            ))
          ) : (
            <Typography variant="body2">No further requests </Typography>
          )}
        </Box>

        {/* Reservations */}
        <Box>
          <TitleDivider />
          <Typography variant="h5">Reserved Seats</Typography>
          <ReservationAvatars reservations={reservations} />
        </Box>

        <TitleDivider />
        <Box>
          <Button
            variant={"text"}
            size="small"
            onClick={openConfirmation}
            color="error"
          >
            Delete Trip
          </Button>
        </Box>

        {/* Bottom action bar */}
        {/* <BottomActionBar
          variant={"contained"}
          color={"error"}
          onClick={openDeleteConfirmation}
          buttonText={"Delete Trip"}
        /> */}
      </Box>
    </>
  );
};
