// import React from "react";
// import { Controller } from "react-hook-form";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import ListItemText from "@mui/material/ListItemText";
// import Select from "@mui/material/Select";
// import Checkbox from "@mui/material/Checkbox";
// import FormHelperText from "@mui/material/FormHelperText"; // Added import for FormHelperText

// export const LanguageSelect = ({ control, name, label, errors }) => {
//   const languageOptions = [
//     "english",
//     "german",
//     "spanish",
//     "french",
//     "italian",
//     "portuguese",
//     "dutch",
//   ];

//   const ITEM_HEIGHT = 48;
//   const ITEM_PADDING_TOP = 8;
//   const MenuProps = {
//     PaperProps: {
//       style: {
//         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//         width: 250,
//       },
//     },
//   };

//   return (
//     <Controller
//       name={name}
//       control={control}
//       rules={{ required: "This field is required" }}
//       render={({ field: { onChange, value }, fieldState: { error } }) => (
//         <FormControl sx={{ m: 0, width: "100%" }} error={!!error}>
//           <InputLabel>{label}</InputLabel>
//           <Select
//             size="small"
//             multiple
//             value={value || []}
//             onChange={onChange}
//             input={<OutlinedInput label={label} />}
//             // renderValue={(selected) => selected.join(", ")}
//             renderValue={(selected) =>
//               Array.isArray(selected) ? selected.join(", ") : ""
//             }
//             MenuProps={MenuProps}
//           >
//             {languageOptions.map((language) => (
//               <MenuItem key={language} value={language}>
//                 <Checkbox checked={value?.indexOf(language) > -1} />
//                 <ListItemText primary={language} />
//               </MenuItem>
//             ))}
//           </Select>
//           {error && <FormHelperText>{error.message}</FormHelperText>}
//         </FormControl>
//       )}
//     />
//   );
// };

import React from "react";
import { Controller, useForm } from "react-hook-form";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/material";

import { countryOptions } from "../../utils/countryOptions";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const languageOptions = [
  "english",
  "german",
  "spanish",
  "french",
  "italian",
  "portuguese",
  "dutch",
];

export const LanguageSelect = ({ control, name, label, errors }) => {
  return (
    <Box>
      <FormControl sx={{ m: 0, width: "50vw" }}>
        <InputLabel>Languages</InputLabel>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              size="small"
              multiple
              {...field} // Spread field properties (includes onChange, onBlur, value)
              input={<OutlinedInput label={label} />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {languageOptions.map((l) => (
                <MenuItem key={l} value={l}>
                  <Checkbox checked={field.value.indexOf(l) > -1} />
                  <ListItemText primary={l} />
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
    </Box>
  );
};
