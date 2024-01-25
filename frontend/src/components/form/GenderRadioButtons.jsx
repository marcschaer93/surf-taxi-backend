import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Controller } from "react-hook-form";

export const GenderRadioButtons = ({ control }) => {
  return (
    <Controller
      name="gender"
      control={control}
      label="Gender"
      defaultValue="male"
      render={({ field }) => (
        <FormControl>
          <FormLabel>Gender</FormLabel>
          <RadioGroup
            // value={field.value}
            // onChange={(e) => field.onChange(e.target.value)}
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            {...field}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
      )}
    />
  );
};
