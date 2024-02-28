import { Controller } from "react-hook-form";
import { registerOptions } from "../../utils/registerOptions";
import { DateField } from "@mui/x-date-pickers/DateField";

export const FormInputDate = ({
  name,
  control,
  label,
  errors,
  disabled = false,
  type = null,
  InputLabelProps = null,
  defaultValue = null,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={registerOptions[name]}
      render={({ field }) => (
        <DateField
          size="small"
          format="LL"
          {...field}
          error={!!errors[name]}
          helperText={errors[name] && errors[name].message}
          variant="outlined"
          fullWidth
          disabled={disabled}
          type={type}
          InputLabelProps={InputLabelProps}
          defaultValue={defaultValue}
        />
      )}
    />
  );
};
