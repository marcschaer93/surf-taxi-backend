import React from "react";
import { Controller } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

export const GenderSelect = ({ control, name, label, errors }) => {
  const genderOptions = ["male", "female", "other"];

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: "required" }}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <FormControl
          error={!!error}
          size="small"
          sx={{ minWidth: 120, marginTop: 0 }}
        >
          <InputLabel>{label}</InputLabel>
          <Select
            label={label}
            value={value}
            onChange={onChange}
            inputRef={ref}
          >
            {genderOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
