import { styled, Typography, Divider } from "@mui/material";

import { theme } from "../utils/theme";

export const Title = styled(Typography)(({ theme }) => ({
  textAlign: "left",
  marginBottom: "20px",
  marginTop: "35px",

  [theme.breakpoints.up("sm")]: {},
}));

export const TitleDivider = styled(Divider)(({ theme }) => ({
  marginBottom: { xs: "20px", sm: "20px" },
  marginTop: "20px",
  marginBottom: "30px",
}));
