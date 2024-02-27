import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Typography, Box } from "@mui/material";
import { Title, TitleDivider } from "../../styles/fontStyles";

import { useAuthContext } from "../../context/authProvider";
import { GoBackButton } from "../../components/ui/GoBackButton";
import { FormInputText } from "../../components/form/FormInputText";
import { BottomActionBar } from "../../components/BottomActionBar";

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
      // destination: "Santander",
      // stops: "Hossegor",
      // travelInfo: "surftrip",
      // costs: "split gas \u0026 tolls",
      // seats: 2,
    },
  });

  const onFormSubmit = (formData) => {
    console.log("data", formData);
    // UserApi.updateUserProfile(user.username, formData);
    // setCurrentUser(() => data);
    // navigate("/profile");
    //   addTrip(formData);
    //   e.preventDefault();
  };

  return (
    <>
      <FormContainer>
        <Box component="form" autoComplete="off" sx={{ marginBottom: "80px" }}>
          <InputsContainer>
            <Input>
              <FormInputText
                name="startLocation"
                control={control}
                label="From"
                errors={errors}
              />
            </Input>
          </InputsContainer>
          {/* Bottom action bar */}
          <BottomActionBar
            type="submit"
            variant={"contained"}
            color={"primary"}
            // onClick={handleSubmit(onFormSubmit)}
            buttonText={"Save"}
          />
        </Box>
      </FormContainer>
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
