// By default, ErrorBoundary passes to the FallbackComponent the following two props:

// error: stores the error object caught by the error boundary.
// resetErrorBoundary: contains the callback function passed to the onReset prop, if defined.

export default function ErrorPage(props) {
  return (
    <div className={"error-page"}>
      <div className={"oops"}>Oops!</div>
      <div className={"message"}>Something went wrong...</div>
      {props.resetErrorBoundary && (
        <div>
          <button className={"retry-button"} onClick={props.resetErrorBoundary}>
            🔄 Try Again!
          </button>
        </div>
      )}
    </div>
  );
}
