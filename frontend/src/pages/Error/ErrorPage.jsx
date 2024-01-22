// By default, ErrorBoundary passes to the FallbackComponent the following two props:

// error: stores the error object caught by the error boundary.
// resetErrorBoundary: contains the callback function passed to the onReset prop, if defined.

import { Box, Button } from "@mui/material";

import {
  errorPage,
  oops,
  message,
  retryButton,
} from "../../styles/errorPageStyles";

export default function ErrorPage(props) {
  return (
    <Box sx={errorPage}>
      <Box sx={oops}>Oops!</Box>
      <Box sx={message}>Something went wrong...</Box>

      {props.resetErrorBoundary && (
        <Box>
          <Button
            variant="outlined"
            color="error"
            type="submit"
            size="medium"
            sx={retryButton}
            onClick={props.resetErrorBoundary}
          >
            Try Again!
          </Button>
        </Box>
      )}
    </Box>
  );
}
