import { useAuthContext } from "../context/authProvider";
import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const auth = useAuthContext();

  if (!auth.user) {
    console.warn("Not Authorized. Log in first.");
    return <Navigate to="/login" />;
  }
  return children;
};
