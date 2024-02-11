import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { IconButton, Typography, Box } from "@mui/material";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(username) {
  return {
    sx: {
      bgcolor: stringToColor(username),
    },
    // children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    children: username[0], // Display the first letter of the username as the avatar
  };
}

export const PassengerAvatars = ({ passengers }) => {
  // Filter passengers based on reservationStatus
  const filteredPassengers = passengers.filter(
    (p) => p.reservationStatus === "confirmed"
  );

  return (
    <>
      {filteredPassengers.length > 0 ? (
        <Stack direction="row" spacing={2}>
          {filteredPassengers.map((p, index) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton onClick={() => handleAvatarClick(p.username)}>
                <Avatar key={index} {...stringAvatar(p.username)} />
              </IconButton>
              <Typography variant="body2">{p.username}</Typography>
            </Box>
          ))}
        </Stack>
      ) : (
        <Typography variant="body2">No confirmed passengers</Typography>
      )}
    </>
  );
};
