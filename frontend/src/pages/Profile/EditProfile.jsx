import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Navigate } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";
import { DateField } from "@mui/x-date-pickers/DateField";

import { FormInputText } from "../../components/form/FormInputText";
import { FormInputMultiline } from "../../components/form/FormInputMultiline";
import { useAuthContext } from "../../context/authProvider";
import * as UserApi from "../../api/services/UserApi";
import { GenderRadioButtons } from "../../components/form/GenderRadioButtons";
import { Title, TitleDivider } from "../../styles/fontStyles";
import { BottomActionBar } from "../../components/BottomActionBar";
import { FormInputDate } from "../../components/form/FormInputDate";
import { GenderSelect } from "../../components/form/GenderSelect";

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
  SeventyPercentInput,
  ThirtyPercentInput,
} from "../../styles/formStyles";

import { GoBackButton } from "../../components/ui/GoBackButton";
import { BottomSpacer } from "../../components/ui/BottomSpacer";
import { BirthyearSelect } from "../../components/form/BirthyearSelect";
import { LanguageSelect } from "../../components/form/LanguageSelect";
import { CountrySelect } from "../../components/form/CountrySelect";

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
  const { user, updateUser } = useAuthContext();

  const {
    username,
    firstName,
    lastName,
    email,
    gender,
    birthYear,
    bio,
    languages,
    country,
  } = user;

  console.log("user languages", Array.isArray(user.languages));

  const {
    control,
    handleSubmit,
    setError, // Add setError from useForm
    formState: { errors }, // Handling form validation errors
  } = useForm({
    defaultValues: {
      username: username || "",
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
      gender: gender || "other",
      birthYear: birthYear || "",
      bio: bio || "",
      languages: Array.isArray(languages) ? languages : [],
      country: country || "",
    },
  });

  const onFormSubmit = async (formData) => {
    // const { firstName, lastName, email } = data;
    // const dataWithoutUsername = { firstName, lastName, email };

    console.log("FORM DATA", formData);

    const updatedUserData = await UserApi.updateUserProfile(formData);
    console.log("UPDATE DATA", updatedUserData);
    updateUser(updatedUserData);
    navigate("/my-profile");
  };

  return (
    <>
      <Box>
        <GoBackButton handleGoBack={() => navigate(-1)} />
        <Title variant="h3">Personal details</Title>
        <TitleDivider />
      </Box>
      <FormContainer>
        <Box
          component="form"
          autoComplete="off"
          // onSubmit={handleSubmit(onFormSubmit)}
          sx={{ marginBottom: "80px" }}
        >
          <InputsContainer>
            <Input>
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

            {/* <Input>
              <FormInputText
                name="avatar"
                control={control}
                label="Avatar"
                errors={errors}
              />
            </Input>
            <Input>
              <FormInputText
                name="facebook"
                control={control}
                label="Facebook"
                errors={errors}
              />
            </Input>
            <FormInputText
              name="instagram"
              control={control}
              label="Instagram"
              errors={errors}
            /> */}
            <HalfInputContainer>
              {/* Birthday */}
              {/* <HalfInput>
                <FormInputDate
                  name="birthday"
                  // format="DD-MM-YYYY"
                  control={control}
                  label="Birthday"
                  errors={errors}
                />
              </HalfInput> */}
              <HalfInput>
                <BirthyearSelect
                  control={control}
                  errors={errors}
                  name="birthYear"
                  label="Birthyear"
                />
              </HalfInput>

              {/* <GenderRadioButtons control={control} /> */}
              <HalfInput>
                <GenderSelect
                  control={control}
                  name="gender"
                  label="Gender"
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
            <HalfInputContainer>
              <SeventyPercentInput>
                <LanguageSelect
                  name="languages"
                  control={control}
                  label="Language"
                  errors={errors}
                />
              </SeventyPercentInput>
              <ThirtyPercentInput>
                <CountrySelect
                  name="country"
                  control={control}
                  label="Country"
                  errors={errors}
                />
              </ThirtyPercentInput>
            </HalfInputContainer>

            <Input>
              <FormInputMultiline
                name="bio"
                control={control}
                label="Bio"
                errors={errors}
                rows={3}
              />
            </Input>
          </InputsContainer>
        </Box>
      </FormContainer>
      <BottomSpacer />

      {/* Bottom action bar */}
      <BottomActionBar
        variant={"contained"}
        color={"primary"}
        onClick={handleSubmit(onFormSubmit)}
        buttonText={"Save"}
      />
    </>
  );
};
