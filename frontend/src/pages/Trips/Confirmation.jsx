import { Typography, Box, Button, styled } from "@mui/material";

export const Confirmation = ({
  tripDetails,
  userStatus,
  onConfirm,
  onCancel,
  onGoBack,
}) => {
  const FullPageConfirmation = styled(Box)({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1000, // Adjust the z-index as needed
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Adjust background color and opacity as needed
  });

  const alreadyRequested = userStatus === "requested";
  const alreadyConfirmed = userStatus === "confirmed";

  return (
    <>
      {alreadyRequested ? (
        <FullPageConfirmation>
          <Box>
            <Typography variant="h5">Confirm Cancellation</Typography>
            <Typography variant="body1">
              Start Location: {tripDetails.startLocation}
            </Typography>
            <Typography>Destination: {tripDetails.destination}</Typography>
            <Button variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="outlined" onClick={onGoBack}>
              Back
            </Button>
          </Box>
        </FullPageConfirmation>
      ) : (
        <FullPageConfirmation>
          <Box>
            <Typography variant="h5">Confirm Join Trip</Typography>
            <Typography variant="body1">
              Start Location: {tripDetails.startLocation}
            </Typography>
            <Typography>Destination: {tripDetails.destination}</Typography>
            <Button variant="outlined" onClick={onConfirm}>
              Confirm
            </Button>
            <Button variant="outlined" onClick={onGoBack}>
              Back
            </Button>
          </Box>
        </FullPageConfirmation>
      )}
    </>
  );
};

{
  /* {alreadyConfirmed && (
  <div>
    <h3>Confirm Join Trip</h3>
    <p>Start Location: {tripDetails.startLocation}</p>
    <p>Destination: {tripDetails.destination}</p>
    <button onClick={onConfirm}>Confirm Join</button>
    <button onClick={onCancel}>Back</button>
  </div>
)} */
}
