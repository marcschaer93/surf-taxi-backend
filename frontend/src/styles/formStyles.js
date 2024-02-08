import { styled } from "@mui/material";

import { Box, Button, Typography } from "@mui/material";
import { theme } from "../utils/theme";

export const FormContainer = styled(Box)(({ theme }) => ({
  margin: "auto",
  width: "100%",
  padding: "20px",
  paddingBottom: "50px",
  marginTop: "30px",
  borderRadius: "16px",
  backgroundColor: "#FFFFFF",
  border: "solid #CCCCCC 1px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",

  [theme.breakpoints.up("sm")]: {
    width: "35vw",
    marginTop: "60px",
  },
}));

export const TitleContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
  width: "100%",
  marginTop: "30px",
  paddingTop: "30px",
});

export const FormTitle = styled(Typography)({
  fontSize: "30px",
  fontWeight: 700,
  // [theme.breakpoints.up("sm")]: {
  //   fontSize: "48px",
  // },
});

export const Underline = styled(Box)({
  width: "61px",
  height: "6px",
  backgroundColor: "#6e5494",
  borderRadius: "9px",
  marginBottom: "5px",
});

export const InputsContainer = styled(Box)({
  marginTop: "55px",
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

export const Input = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",

  [theme.breakpoints.up("sm")]: {
    width: "29vw",
  },
}));

export const HalfInput = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",

  [theme.breakpoints.up("sm")]: {
    width: "14vW",
  },
}));

export const HalfInputContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
}));

export const SubmitContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  margin: "50px auto 0",
});

export const SubmitButton = styled(Button)({
  borderRadius: "50px",
  width: "100%",
  fontWeight: "bold",
});

export const SwitchContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  color: "#797979",
  fontSize: "18px",
  marginTop: "15px",
  gap: "10px",
});

export const LostPasswordContainer = styled(Box)({
  display: "flex",
  justifyContent: "right",
  color: "#797979",
  fontSize: "11px",
  cursor: "pointer",
  marginRight: "15px",
  marginTop: "10px",

  [theme.breakpoints.up("sm")]: {
    marginLeft: "50px",
  },
});

export const SignupLink = styled(Box)({
  cursor: "pointer",
  fontWeight: "bold",
  textDecoration: "none",
  color: "#d41b64",
});
