import { Chip, styled } from "@mui/material";
import { theme } from "../../utils/theme";

export const StatusChip = ({ isTripOwner, status }) => {
  const StyledChip = styled(Chip)({
    // position: "absolute",
    // top: 18,
    // right: 18,
    fontSize: "11px",
    fontWeight: "bold",
    padding: "14px 10px",
  });

  const getChipColor = () => {
    if (isTripOwner) return { backgroundColor: "#d41b64", color: "white" }; // Custom color for owner
    switch (status) {
      case "organizer":
        return {
          backgroundColor: "#d41b64",
          color: theme.palette.success.contrastText,
        };
      case "confirmed":
        return {
          backgroundColor: theme.palette.success.main,
          color: theme.palette.success.contrastText,
        };
      case "pending":
        return {
          backgroundColor: theme.palette.info.main,
          color: theme.palette.info.contrastText,
        };
      case "rejected":
        return {
          backgroundColor: theme.palette.error.main,
          color: theme.palette.error.contrastText,
        };
      case "requested":
        return {
          backgroundColor: theme.palette.warning.main,
          color: theme.palette.warning.contrastText,
        };
      default:
        return { backgroundColor: theme.palette.grey[500], color: "white" }; // Default case
    }
  };

  const chipStyles = getChipColor();

  return (
    <StyledChip
      sx={{
        ...chipStyles,
        // backgroundColor: isTripOwner ? "#d41b64" : theme.palette.primary.main,
        // color: isTripOwner ? "white" : "white",
      }}
      label={
        isTripOwner ? "ORGANIZER" : status ? status.toUpperCase() : "NOT GOOD"
      }
      variant="filled"
      size="small"
    />
  );
};
