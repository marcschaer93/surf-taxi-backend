// import React, { useState } from "react";
// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";

// export const CountrySelect = ({ country, handleChange, name, label }) => {
//   const countryOptions = [
//     { code: "PT", name: "Portugal", flag: "🇵🇹" },
//     { code: "ES", name: "Spain", flag: "🇪🇸" },
//     { code: "FR", name: "France", flag: "🇫🇷" },
//     { code: "IE", name: "Ireland", flag: "🇮🇪" },
//     { code: "UK", name: "United Kingdom", flag: "🇬🇧" },
//     { code: "NO", name: "Norway", flag: "🇳🇴" },
//     { code: "DE", name: "Germany", flag: "🇩🇪" },
//     { code: "NL", name: "Netherlands", flag: "🇳🇱" },
//     { code: "DK", name: "Denmark", flag: "🇩🇰" },
//     { code: "IT", name: "Italy", flag: "🇮🇹" },
//     { code: "MA", name: "Morocco", flag: "🇲🇦" },
//     { code: "SE", name: "Sweden", flag: "🇸🇪" },
//     { code: "BE", name: "Belgium", flag: "🇧🇪" },
//     { code: "CH", name: "Switzerland", flag: "🇨🇭" },
//     { code: "HR", name: "Croatia", flag: "🇭🇷" },
//   ];

//   return (
//     <FormControl sx={{ m: 0, minWidth: 120 }} size="small">
//       <InputLabel>Country</InputLabel>
//       <Select value={country} label={label} onChange={handleChange} name={name}>
//         {countryOptions.map((c) => (
//           <MenuItem key={c.code} value={c.name}>
//             {c.flag} {c.code}
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   );
// };

// import React from "react";
// import { Controller } from "react-hook-form";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";

// export const CountrySelect = ({ control, name, label, errors }) => {
//   const countryOptions = [
//     { code: "PT", name: "Portugal", flag: "🇵🇹" },
//     { code: "ES", name: "Spain", flag: "🇪🇸" },
//     { code: "FR", name: "France", flag: "🇫🇷" },
//     { code: "IE", name: "Ireland", flag: "🇮🇪" },
//     { code: "UK", name: "United Kingdom", flag: "🇬🇧" },
//     { code: "NO", name: "Norway", flag: "🇳🇴" },
//     { code: "DE", name: "Germany", flag: "🇩🇪" },
//     { code: "NL", name: "Netherlands", flag: "🇳🇱" },
//     { code: "DK", name: "Denmark", flag: "🇩🇰" },
//     { code: "IT", name: "Italy", flag: "🇮🇹" },
//     { code: "MA", name: "Morocco", flag: "🇲🇦" },
//     { code: "SE", name: "Sweden", flag: "🇸🇪" },
//     { code: "BE", name: "Belgium", flag: "🇧🇪" },
//     { code: "CH", name: "Switzerland", flag: "🇨🇭" },
//     { code: "HR", name: "Croatia", flag: "🇭🇷" },
//   ];

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
//         <FormControl sx={{ m: 0, minWidth: 120 }} size="small" error={!!error}>
//           <InputLabel>{label}</InputLabel>
//           <Select
//             value={value}
//             onChange={onChange}
//             label={label}
//             inputRef={ref}
//           >
//             {countryOptions.map((country) => (
//               <MenuItem key={country.code} value={country.name}>
//                 {country.flag} {country.code}
//               </MenuItem>
//             ))}
//           </Select>
//           {error && (
//             <p style={{ color: "red", fontSize: "0.75rem" }}>{error.message}</p>
//           )}
//         </FormControl>
//       )}
//       rules={{ required: "This field is required" }}
//     />
//   );
// };

import React from "react";
import { Controller } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

export const CountrySelect = ({ control, name, label, errors }) => {
  const countryOptions = [
    { code: "PT", name: "Portugal", flag: "🇵🇹" },
    { code: "ES", name: "Spain", flag: "🇪🇸" },
    { code: "FR", name: "France", flag: "🇫🇷" },
    { code: "IE", name: "Ireland", flag: "🇮🇪" },
    { code: "UK", name: "United Kingdom", flag: "🇬🇧" },
    { code: "NO", name: "Norway", flag: "🇳🇴" },
    { code: "DE", name: "Germany", flag: "🇩🇪" },
    { code: "NL", name: "Netherlands", flag: "🇳🇱" },
    { code: "DK", name: "Denmark", flag: "🇩🇰" },
    { code: "IT", name: "Italy", flag: "🇮🇹" },
    { code: "MA", name: "Morocco", flag: "🇲🇦" },
    { code: "SE", name: "Sweden", flag: "🇸🇪" },
    { code: "BE", name: "Belgium", flag: "🇧🇪" },
    { code: "CH", name: "Switzerland", flag: "🇨🇭" },
    { code: "HR", name: "Croatia", flag: "🇭🇷" },
  ];

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: "required" }}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <FormControl
          fullWidth
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
            displayEmpty
          >
            {countryOptions.map((option) => (
              <MenuItem key={option.code} value={option.code}>
                {option.flag} {option.code}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
