import { Controller } from "react-hook-form";
import { registerOptions } from "../../utils/registerOptions";
import { DateField } from "@mui/x-date-pickers/DateField";
import { FormControl } from "@mui/material";

// Material UI DateField
import { LocalizationProvider } from "@mui/x-date-pickers";
// If you are using date-fns v3.x, please import the v3 adapter
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

export const FormInputDate = ({
  name,
  control,
  format,
  label,
  errors,
  InputLabelProps = null,
  defaultValue = null,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        rules={registerOptions[name]}
        render={({ field }) => (
          <FormControl sx={{ m: 0, minWidth: 120 }} size="small">
            <DateField
              {...field}
              size="small"
              name={name}
              label={label}
              // defaultValue={dayjs("2022-04-17")}
              format={format}
            />
          </FormControl>
        )}
      />
    </LocalizationProvider>
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
