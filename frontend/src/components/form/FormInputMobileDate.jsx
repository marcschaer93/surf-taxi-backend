// import * as React from "react";
// import { Controller } from "react-hook-form";
// import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
// import { format } from "date-fns";

// import TextField from "@mui/material/TextField";

// export const FormInputMobileDate = ({ control }) => {
//   return (
//     <Controller
//       name="date"
//       control={control}
//       rules={{ required: "This field is required" }}
//       render={({ field: { onChange, value, error } }) => (
//         <MobileDatePicker
//           size="small"
//           label="Date"
//           error={!!error}
//           helperText={error ? error.message : null}
//           value={value || null}
//           onChange={onChange}
//         />
//       )}
//     />
//   );
// };

import * as React from "react";
import { Controller } from "react-hook-form";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { TextField } from "@mui/material";

// Material UI DateField
import { LocalizationProvider } from "@mui/x-date-pickers";
// If you are using date-fns v3.x, please import the v3 adapter
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

export const FormInputMobileDate = ({ control }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name="date"
        control={control}
        rules={{ required: "This field is required" }}
        render={({ field: { onChange, value, error } }) => (
          <MobileDatePicker
            size="small"
            label="Date"
            error={!!error}
            helperText={error ? error.message : null}
            value={value || null}
            onChange={onChange}
          />
        )}
      />
    </LocalizationProvider>
  );
};
