// import { Chip, styled } from "@mui/material";
// import { theme } from "../../utils/theme";

// export const CardStatusChip = ({ isTripOrganizer, status }) => {
//   const StyledChip = styled(Chip)({
//     position: "absolute",
//     top: 18,
//     right: 18,
//     fontSize: "12px",
//     fontWeight: "bold",
//   });

//   return (
//     <StyledChip
//       sx={{
//         backgroundColor: isTripOrganizer
//           ? "#d41b64"
//           : theme.palette.primary.main,
//         color: isTripOrganizer ? "white" : "white",
//       }}
//       label={
//         isTripOrganizer
//           ? "ORGANIZER"
//           : status
//           ? status.toUpperCase()
//           : "NOT GOOD"
//       }
//       variant="filled"
//       size="medium"
//     />
//   );
// };
