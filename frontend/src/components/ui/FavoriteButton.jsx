import { styled } from "@mui/material";
import { IconButton } from "@mui/material";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { Box, Card, Button, Typography } from "@mui/material";
import { theme } from "../../utils/theme";

export const FavoriteButton = ({ isFavorited, handleFavorite }) => {
  const FavoriteButton = styled(IconButton)({
    // borderRadius: "50%",
    // border: `0.1px solid ${theme.palette.text.secondary}`,
    padding: "5px", // Adjust padding as needed
    // backgroundColor: "white",
    "&:hover": {
      backgroundColor: "white",
      color: theme.palette.primary.contrastText,
    },
    "& .MuiSvgIcon-root": {
      fontSize: "1.5rem", // Adjust the size as needed
    },

    position: "absolute",
    top: 18,
    right: 18,
    fontSize: "8px",
    fontWeight: "bold",
  });

  return (
    <FavoriteButton onClick={handleFavorite}>
      {isFavorited ? (
        <FavoriteIcon
          style={{
            cursor: "pointer",
            color: theme.palette.contrast.main,
          }}
        />
      ) : (
        <FavoriteBorderSharpIcon
          style={{
            cursor: "pointer",
            color: theme.palette.text.secondary,
          }}
        />
      )}
    </FavoriteButton>
  );
};
