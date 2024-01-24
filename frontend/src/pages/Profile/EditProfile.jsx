import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Navigate } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";

import { FormInputText } from "../../components/form/FormInputText";
import { useAuthContext } from "../../context/authProvider";
import * as UserApi from "../../api/services/UserApi";

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

/**
 * EditForm Component
 *
 * Renders a form to edit user profile details like username, first name, last name, and email.
 * Utilizes useContext, useForm hooks for form handling, and user authentication data.
 *
 * @returns {JSX.Element} - Form for editing user profile.
 */

export const EditProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  console.log("user", user);

  const { username, firstName, lastName, email } = user;
  const {
    control,
    handleSubmit,
    setError, // Add setError from useForm
    formState: { errors }, // Handling form validation errors
  } = useForm({
    defaultValues: {
      username: `${username}`,
      firstName: `${firstName}`,
      lastName: `${lastName}`,
      email: `${email}`,
    },
  });

  const onFormSubmit = (formData) => {
    const { firstName, lastName, email } = formData;
    const dataWithoutUsername = { firstName, lastName, email };

    UserApi.updateUserProfile(dataWithoutUsername);
    setCurrentUser(() => data);
    navigate("/");
  };

  return (
    <FormContainer>
      <TitleContainer>
        <FormTitle variant="h1">Profile</FormTitle>
        <Underline></Underline>
      </TitleContainer>

      <form autoComplete="off" onSubmit={handleSubmit(onFormSubmit)}>
        <InputsContainer className="inputs">
          <Input className="input">
            <FormInputText
              name="username"
              control={control}
              label="Username"
              errors={errors}
              disabled={true}
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

          <Input className="input">
            <FormInputText
              name="email"
              control={control}
              label="Email"
              errors={errors}
            />
          </Input>
        </InputsContainer>

        <SubmitContainer className="submit-container">
          <SubmitButton
            variant="contained"
            color="primary"
            type="submit"
            size="medium"
          >
            Save Changes
          </SubmitButton>
        </SubmitContainer>
      </form>
    </FormContainer>
  );
};
