import { styled } from "@mui/material";
import { IconButton } from "@mui/material";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

import { Box, Card, Button, Typography } from "@mui/material";
import { theme } from "../../utils/theme";

export const GoBackButton = ({ handleGoBack }) => {
  const GoBackButton = styled(IconButton)({
    borderRadius: "50%",
    // border: `0.1px solid ${theme.palette.text.secondary}`,
    padding: "5px", // Adjust padding as needed
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "white",
      color: theme.palette.primary.contrastText,
    },
    "& .MuiSvgIcon-root": {
      fontSize: "1.2rem", // Adjust the size as needed
    },

    // position: "absolute",
    top: 10,
    left: 0,
    fontSize: "8px",
    fontWeight: "bold",
  });

  return (
    <GoBackButton onClick={handleGoBack}>
      <ArrowBackIosNewOutlinedIcon
        style={{
          cursor: "pointer",
          color: theme.palette.text.secondary,
        }}
      />
    </GoBackButton>
  );
};
