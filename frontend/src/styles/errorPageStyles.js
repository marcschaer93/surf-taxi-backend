import { theme } from "../utils/theme";

const errorPageStyles = {
  errorPage: {
    background: "black",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    textAlign: "center",
  },
  oops: {
    fontSize: "48px",
    fontWeight: "bold",
    marginBottom: "16px",
    color: "white",
  },
  message: {
    fontSize: "24px",
    color: "white",
    marginBottom: "32px",
  },
  retryButton: {
    // backgroundColor: theme.palette.primary.main,
    // color: theme.palette.primary.contrastText,
    // padding: "10px 20px",
    // fontSize: "18px",
    cursor: "pointer",
    borderRadius: "4px",
    "&:hover": {
      //   backgroundColor: theme.palette.primary.dark,
    },
  },
};

export const { errorPage, oops, message, retryButton } = errorPageStyles;
