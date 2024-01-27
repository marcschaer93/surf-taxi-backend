// const formStyles = {
//   formContainer: {
//     width: "600px",
//     margin: "auto",
//     padding: "20px",
//     paddingBottom: "50px",
//     marginTop: "60px",
//     border: "solid #CCCCCC 1px",
//     boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
//     borderRadius: "16px",
//     backgroundColor: "#FFFFFF",
//   },
//   titleContainer: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     gap: "20px",
//     width: "100%",
//     marginTop: "30px",
//     paddingTop: "30px",
//   },
//   underline: {
//     width: "61px",
//     height: "6px",
//     backgroundColor: "#6e5494",
//     borderRadius: "9px",
//     marginBottom: "5px", // Adjust this margin as needed to position it under the text
//   },
//   inputs: {
//     marginTop: "55px",
//     alignItems: "center",
//     display: "flex",
//     flexDirection: "column",
//     gap: "20px",
//   },
//   // input: {
//   //   display: "flex",
//   //   alignItems: "center",
//   //   width: "100%",

//   //   [theme.breakpoints.up("sm")]: {
//   //     width: "480px",
//   //   },
//   // },
//   submitContainer: {
//     display: "flex",
//     justifyContent: "center",
//     margin: "50px auto 0",
//   },
//   submitButton: {
//     borderRadius: "50px",
//     width: "480px",
//     fontWeight: "bold",
//   },
//   switchContainer: {
//     display: "flex",
//     justifyContent: "center",
//     color: "#797979",
//     fontSize: "18px",
//     marginTop: "15px",
//     gap: "10px",
//   },
//   lostPasswordContainer: {
//     display: "flex",
//     justifyContent: "left",
//     color: "#797979",
//     fontSize: "12px",
//     cursor: "pointer",
//     marginLeft: "50px",
//     marginTop: "5px",
//   },
//   link: {
//     cursor: "pointer",
//     fontWeight: "bold",
//     textDecoration: "none",
//     color: "#d41b64",
//   },
// };

// export const {
//   formContainer,
//   titleContainer,
//   underline,
//   inputs,
//   input,
//   submitContainer,
//   switchContainer,
//   lostPasswordContainer,
//   link,
//   submitButton,
// } = formStyles;

import { styled } from "@mui/material";

import { Box, Button, Typography } from "@mui/material";
import { theme } from "../utils/theme";

export const FormContainer = styled(Box)(({ theme }) => ({
  margin: "auto",
  width: "100%",
  // maxWidth: "400px",
  padding: "20px",
  paddingBottom: "50px",
  marginTop: "30px",
  borderRadius: "16px",
  backgroundColor: "#FFFFFF",
  border: "solid #CCCCCC 1px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",

  [theme.breakpoints.up("sm")]: {
    width: "35vW",
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
    width: "29vW",
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
  width: "480px",
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
  justifyContent: "left",
  color: "#797979",
  fontSize: "12px",
  cursor: "pointer",
  marginLeft: "50px",
  marginTop: "5px",
});

export const SignupLink = styled(Box)({
  cursor: "pointer",
  fontWeight: "bold",
  textDecoration: "none",
  color: "#d41b64",
});
