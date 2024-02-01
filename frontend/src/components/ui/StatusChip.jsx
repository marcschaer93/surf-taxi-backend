import { Chip, styled } from "@mui/material";
import { theme } from "../../utils/theme";

export const StatusChip = ({ isTripOwner }) => {
  const StyledChip = styled(Chip)({
    position: "absolute",
    top: 18,
    right: 18,
    fontSize: "8px",
    fontWeight: "bold",
  });

  return (
    <StyledChip
      sx={{
        backgroundColor: isTripOwner ? "#d41b64" : theme.palette.primary.main,
        color: isTripOwner ? "white" : "white",
      }}
      label={isTripOwner ? "Owner" : "Passenger"}
      variant="filled"
      size="small"
    />
  );
};
