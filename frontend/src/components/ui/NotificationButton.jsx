import { styled } from "@mui/material";
import { IconButton } from "@mui/material";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Link } from "react-router-dom";

import { Box, Card, Button, Typography, Badge } from "@mui/material";
import { theme } from "../../utils/theme";

export const NotificationButton = ({ handleGoBack, notifications }) => {
  const NotificationButton = styled(Link)({
    borderRadius: "50%",
    // border: `0.1px solid ${theme.palette.text.secondary}`,
    // padding: "5px", // Adjust padding as needed
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "white",
      color: theme.palette.primary.contrastText,
    },
    "& .MuiSvgIcon-root": {
      fontSize: "1.6rem", // Adjust the size as needed
    },

    position: "absolute",
    top: 100,
    right: 25,
    fontSize: "8px",
    fontWeight: "bold",
  });

  return (
    <NotificationButton to="/notifications">
      <IconButton color="primary">
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsOutlinedIcon />
        </Badge>
      </IconButton>
    </NotificationButton>
  );
};
