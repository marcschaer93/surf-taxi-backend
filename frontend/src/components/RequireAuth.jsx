import { useAuthContext } from "../utils/authProvider";
import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  const auth = useAuthContext();

  if (!auth.user) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default RequireAuth;
