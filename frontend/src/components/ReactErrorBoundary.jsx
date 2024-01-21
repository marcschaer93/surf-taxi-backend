// The FallbackComponent prop contains the fallback UI component to render in the event of an error. When this happens, ErrorBoundary invokes the callback function passed to onError. Otherwise, if no error occurs, ErrorBoundary renders the child components that it wraps. In other terms, this snippet does exactly what the error boundary defined previously does, but with less and more readable code.

import ErrorPage from "./ErrorPage";
import { ErrorBoundary } from "react-error-boundary";

export default function ReactErrorBoundary(props) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorPage}
      onError={(error, errorInfo) => {
        // log the error
        console.log("Error caught!");
        console.error(error);
        console.error(errorInfo);
      }}
      onReset={() => {
        // reloading the page to restore the initial state
        // of the current page
        console.log("reloading the page...");
        window.location.reload();

        // other reset logic...
      }}
    >
      {props.children}
    </ErrorBoundary>
  );
}
