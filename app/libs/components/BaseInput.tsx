"use client";

import type { TextFieldProps } from "@mui/material/TextField";
import TextField from "@mui/material/TextField";

export type BaseInputProps = TextFieldProps & {
  containerClassName?: string;
  onIconClick?: () => void;
};

export default function BaseInput({
  label,
  required,
  containerClassName,
  sx,
  ...rest
}: BaseInputProps) {
  return (
    <TextField
      fullWidth
      label={label}
      required={required}
      className={containerClassName}
      sx={{
        // "& .MuiOutlinedInput-notchedOutline": {
        //   borderWidth: 2,
        //   borderColor: "primary.main",
        // },
        // "&:hover .MuiOutlinedInput-notchedOutline": {
        //   borderColor: "primary.main",
        // },
        // "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
        //   borderColor: "primary.main",
        // },
        ...sx,
      }}
      {...rest}
    />
  );
}
