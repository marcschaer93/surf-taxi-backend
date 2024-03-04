import React, { useContext } from "react";
import { useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";

import { FormInputText } from "../../components/form/FormInputText";
import { FormInputPassword } from "../../components/form/FormInputPassword";
import { useAuthContext } from "../../context/authProvider";
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
  HalfInput,
  HalfInputContainer,
} from "../../styles/formStyles";
import { BottomSpacer } from "../../components/ui/BottomSpacer";

/**
 * RegisterForm Component
 *
 * Renders a registration form allowing users to sign up.
 * Utilizes useForm for form control and validation, CurrentUserContext for user-related actions, and JoblyApi for registration.
 *
 * @returns {JSX.Element} - A registration form component with input fields for username, password, first name, last name, and email.
 */

export const RegisterForm = () => {
  //   const theme = useTheme();
  const { handleRegister, user } = useAuthContext();

  const {
    control,
    handleSubmit,
    reset,
    setError, // Add setError from useForm
    formState: { errors }, // Handling form validation errors
  } = useForm({
    defaultValues:
      process.env.NODE_ENV === "development"
        ? {
            username: "marcschaer",
            password: "199316",
            firstName: "Marc",
            lastName: "Schär",
            email: "marc.schaer93@gmail.com",
          }
        : {
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            email: "",
          },
  });

  //   const { setToken } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  // react-hook-form method with auto arg: form-data
  const onFormSubmit = async (formData) => {
    try {
      await handleRegister(formData);
      navigate("/trips");
      reset();
    } catch (error) {
      // setError (react-hook-form)
      setError("username", {
        type: "manual",
        message: error.message,
      });
    }
  };

  return (
    <>
      <FormContainer>
        <TitleContainer>
          <FormTitle variant="h1">Register Form</FormTitle>
          <Underline></Underline>
        </TitleContainer>
        <form autoComplete="off" onSubmit={handleSubmit(onFormSubmit)}>
          <InputsContainer>
            <Input>
              <FormInputText
                name="username"
                control={control}
                label="Username"
                errors={errors}
              />
            </Input>
            <HalfInputContainer>
              <HalfInput>
                <FormInputText
                  name="firstName"
                  control={control}
                  label="First name"
                  errors={errors}
                />
              </HalfInput>
              <HalfInput>
                <FormInputText
                  name="lastName"
                  control={control}
                  label="Last Name"
                  errors={errors}
                />
              </HalfInput>
            </HalfInputContainer>
            <Input>
              <FormInputText
                name="email"
                control={control}
                label="Email"
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

          <SubmitContainer>
            <SubmitButton
              variant="contained"
              color="primary"
              type="submit"
              size="medium"
            >
              Register
            </SubmitButton>
          </SubmitContainer>
        </form>
        <SwitchContainer>
          Already a Member ?
          <SignupLink component={Link} to="/login" exact="true">
            Login
          </SignupLink>
        </SwitchContainer>
      </FormContainer>
      <BottomSpacer />
    </>
  );
};
