import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

import { useAuthContext } from "../../context/authProvider";
import { FormInputUsername } from "../../components/form/FormInputUsername";
import { FormInputPassword } from "../../components/form/FormInputPassword";
import {
  FormContainer,
  TitleContainer,
  Underline,
  InputsContainer,
  Input,
  SubmitContainer,
  SubmitButton,
  SwitchContainer,
  LostPasswordContainer,
  SignupLink,
  FormTitle,
} from "../../styles/formStyles";

/**
 * LoginForm Component
 *
 * Renders a login form allowing users to enter their credentials for authentication.
 * Utilizes React Hook Form for form handling and validation.
 *
 * @returns {JSX.Element} - A login form component with username, password inputs, and submit button.
 */

export const LoginForm = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuthContext();
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "testuser",
      password: "password",
    },
  });

  const onFormSubmit = async (credentials) => {
    try {
      await handleLogin(credentials);
      navigate("/");
      reset();
    } catch (error) {
      // setError (react-hook-form)
      setError("username", {
        type: "manual",
      });
      setError("password", {
        type: "manual",
        message: error.message,
      });
    }
  };

  // const FormContainer = styled(Box)(({ theme }) => ({
  //   margin: "auto",
  //   width: "90%", // Adjust the width for smaller screens
  //   maxWidth: "400px", // Set a maximum width to avoid stretching on very large screens
  //   padding: "20px",
  //   paddingBottom: "50px",
  //   marginTop: "30px",
  //   borderRadius: "16px",
  //   backgroundColor: "#FFFFFF",
  //   border: "solid #CCCCCC 1px",
  //   boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",

  //   [theme.breakpoints.up("sm")]: {
  //     width: "600px", // Adjust width for screens larger than or equal to sm
  //     marginTop: "60px",
  //   },
  // }));

  // const Input = styled(Box)(({ theme }) => ({
  //   display: "flex",
  //   alignItems: "center",
  //   width: "100%",

  //   [theme.breakpoints.up("sm")]: {
  //     width: "480px",
  //   },
  // }));

  return (
    <FormContainer>
      <TitleContainer>
        <FormTitle variant="h4">Login Form</FormTitle>
        <Underline></Underline>
      </TitleContainer>

      <form autoComplete="off" onSubmit={handleSubmit(onFormSubmit)}>
        <InputsContainer>
          <Input>
            <FormInputUsername
              name="username"
              control={control}
              label="Username"
              errors={errors}
            />
          </Input>

          <Input>
            <FormInputPassword
              name="password"
              control={control}
              label="Password"
              errors={errors}
            />
          </Input>
        </InputsContainer>

        <LostPasswordContainer
          onClick={() => alert("Lost Password ? Sorry I can't Help you!")}
        >
          Lost Password
        </LostPasswordContainer>

        <SubmitContainer>
          <SubmitButton
            variant="contained"
            color="primary"
            type="submit"
            size="medium"
          >
            Login
          </SubmitButton>
        </SubmitContainer>
        <SwitchContainer>
          Not a Member yet?
          <SignupLink component={Link} to="/register" exact="true">
            Sign Up.
          </SignupLink>
        </SwitchContainer>
      </form>
    </FormContainer>
  );
};
