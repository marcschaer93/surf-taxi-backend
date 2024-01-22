import { useParams } from "react-router-dom";

// import LoginForm from "../Login/LoginForm";
import { RegisterForm } from "./RegisterForm";

/**
 * Login Component
 *
 * Renders either a login or register form based on the route parameter `formType`.
 *
 * @returns {JSX.Element} - Login or Register form based on the URL parameter
 */

export const Register = () => {
  // const { formType } = useParams();

  // return <div>{formType === "login" ? <LoginForm /> : <RegisterForm />}</div>;
  return <RegisterForm />;
};
