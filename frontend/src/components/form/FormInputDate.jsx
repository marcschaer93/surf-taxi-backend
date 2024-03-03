import { Controller } from "react-hook-form";
import { registerOptions } from "../../utils/registerOptions";
import { DateField } from "@mui/x-date-pickers/DateField";
import { FormControl } from "@mui/material";

export const FormInputDate = ({
  name,
  control,
  label,
  errors,
  InputLabelProps = null,
  defaultValue = null,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={registerOptions[name]}
      render={({ field }) => (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <DateField
            size="large"
            format="LL"
            {...field}
            error={!!errors[name]}
            helperText={errors[name] && errors[name].message}
            variant="outlined"
            InputLabelProps={InputLabelProps}
            defaultValue={defaultValue}
          />
        </FormControl>
      )}
    />
  );
};

// import React from "react";
// import { Controller } from "react-hook-form";
// import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
// import { TextField, FormControl } from "@mui/material";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// export const FormInputDate = ({
//   name,
//   control,
//   label,
//   errors,
//   defaultValue = null,
// }) => {
//   return (
//     <Controller
//       name={name}
//       control={control}
//       rules={{ required: "Date is required" }} // Customize based on your validation requirements
//       render={({ field: { ref, ...restField }, fieldState: { error } }) => (
//         <LocalizationProvider dateAdapter={AdapterDateFns}>
//           <FormControl fullWidth margin="normal" size="small">
//             <MobileDatePicker
//               {...restField}
//               label={label}
//               inputFormat="MM/dd/yyyy"
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   error={!!error}
//                   helperText={error ? error.message : null}
//                 />
//               )}
//               defaultValue={defaultValue}
//             />
//           </FormControl>
//         </LocalizationProvider>
//       )}
//     />
//   );
// };
