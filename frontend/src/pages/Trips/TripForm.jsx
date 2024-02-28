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
      startLocation: "Bern",
      destination: "Santander",
      stops: "Hossegor",
      travelInfo: "surftrip",
      costs: "split gas \u0026 tolls",
      seats: 2,
    },
  });

  const onFormSubmit = (formData) => {
    const date = formData.date;
    // const formattedDate = format(date, "yyyy-MM-dd"); // Formats date to "2024-02-08"
    const formattedDate = formatISO(date);
    const updatedFormData = { ...formData, date: formattedDate };

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
        <Box component="form" autoComplete="off" sx={{ marginBottom: "80px" }}>
          <InputsContainer>
            {/* startLocation */}
            <Input>
              <FormInputText
                name="startLocation"
                control={control}
                label="From"
                errors={errors}
              />
            </Input>

            {/* destination */}
            <Input>
              <FormInputText
                name="destination"
                control={control}
                label="To"
                errors={errors}
              />
            </Input>

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
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Input>

            <Input>
              <FormInputMobileDate control={control} errors={errors} />
            </Input>
          </InputsContainer>
        </Box>
      </FormContainer>
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

  // return (
  //   <>
  //     <form onSubmit={handleSubmit}>
  //       <input type="text" name="date" value={date} onChange={handleChange} />
  //       <input
  //         type="text"
  //         name="start_location"
  //         value={start_location}
  //         onChange={handleChange}
  //       />
  //       <input
  //         type="text"
  //         name="destination"
  //         value={destination}
  //         onChange={handleChange}
  //       />
  //       <input type="text" name="stops" value={stops} onChange={handleChange} />
  //       <input
  //         type="text"
  //         name="travel_info"
  //         value={travel_info}
  //         onChange={handleChange}
  //       />
  //       <input type="text" name="costs" value={costs} onChange={handleChange} />
  //       <input
  //         type="number"
  //         name="seats"
  //         value={seats}
  //         onChange={handleChange}
  //       />

  //       <button type="submit">Add Trip</button>
  //     </form>
  //   </>
  // );
};
