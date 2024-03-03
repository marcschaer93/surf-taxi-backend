import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Typography, Box } from "@mui/material";
import { Title, TitleDivider } from "../../styles/fontStyles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { formatISO } from "date-fns";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../context/authProvider";
import { GoBackButton } from "../../components/ui/GoBackButton";
import { FormInputText } from "../../components/form/FormInputText";
import { BottomActionBar } from "../../components/BottomActionBar";
import { FormInputDate } from "../../components/form/FormInputDate";
import { FormInputMobileDate } from "../../components/form/FormInputMobileDate";
import { CountrySelect } from "../../components/form/CountrySelect";
import { SeventyPercentInput } from "../../styles/formStyles";
import { ThirtyPercentInput } from "../../styles/formStyles";

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

export const TripForm = ({ addTrip }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // date: "2023-12-31",
      originCity: "Bern",
      destinationCity: "Santander",
      stops: "Hossegor",
      travelInfo: "surftrip",
      costs: "split gas \u0026 tolls",
      seats: 2,
      originCountryCode: "",
      destinationCountryCode: "",
    },
  });

  const onFormSubmit = (formData) => {
    const date = formData.date;
    // const formattedDate = format(date, "yyyy-MM-dd"); // Formats date to "2024-02-08"
    const formattedDate = formatISO(date);
    const updatedFormData = { ...formData, date: formattedDate };

    console.log("FORM DATA", updatedFormData);

    addTrip(updatedFormData)
      .then((newTrip) => {
        if (newTrip) {
          console.log("New trip added:", newTrip);
          navigate(`/trips/${newTrip.id}`, { state: { newTrip } });
        } else {
          console.log("Failed to add new trip.");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  return (
    <>
      <FormContainer>
        <Box
          component="form"
          autoComplete="off"
          // onSubmit={handleSubmit(onSubmit)}
          sx={{ marginBottom: "80px" }}
        >
          <InputsContainer>
            <HalfInputContainer>
              {/* startLocation */}
              <SeventyPercentInput>
                <FormInputText
                  name="originCity"
                  control={control}
                  label="From"
                  errors={errors}
                />
              </SeventyPercentInput>

              <ThirtyPercentInput>
                <CountrySelect
                  name="originCountryCode"
                  control={control}
                  label="Country"
                  errors={errors}
                />
              </ThirtyPercentInput>
            </HalfInputContainer>

            <HalfInputContainer>
              {/* destination */}
              <SeventyPercentInput>
                <FormInputText
                  name="destinationCity"
                  control={control}
                  label="To"
                  errors={errors}
                />
              </SeventyPercentInput>

              <ThirtyPercentInput>
                <CountrySelect
                  name="destinationCountryCode"
                  control={control}
                  label="Country"
                  errors={errors}
                />
              </ThirtyPercentInput>
            </HalfInputContainer>

            {/* travelInfo */}
            <Input>
              <FormInputText
                name="travelInfo"
                control={control}
                label="Info"
                errors={errors}
              />
            </Input>

            {/* seats */}
            <Input>
              <FormInputText
                name="seats"
                control={control}
                label="Seats"
                errors={errors}
                type="number"
                // InputLabelProps={{
                //   shrink: true,
                // }}
              />
            </Input>

            <Input>
              <FormInputMobileDate control={control} errors={errors} />
            </Input>
          </InputsContainer>
        </Box>
      </FormContainer>
      <BottomSpacer />

      {/* Bottom action bar */}
      <BottomActionBar
        type="submit"
        variant={"contained"}
        color={"primary"}
        onClick={handleSubmit(onFormSubmit)}
        buttonText={"Save"}
      />
    </>
  );
};
