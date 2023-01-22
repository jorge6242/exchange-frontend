import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { makeStyles } from '@material-ui/core/styles';

const emailPattern = {
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  message: "invalid email address"
}

const useStyles = makeStyles(() => ({
  input: {
    backgroundColor: "transparent",
    border: "1px solid #E0E0E0",
    borderRadius: 8,
    '&.MuiInput-underline:before': {
     backgroundColor: 'blue',
    },

  },
}));

interface CustomTextFieldProps {
  placeholder: string,
  field: string,
  required?: boolean,
  register: any,
  errorsField: any,
  errorsMessageField: any,
  isEmail: boolean,
  disabled?: boolean,
  showIconLeft?: boolean,
  onChange?: Function
}
const CustomTextField: React.FC<CustomTextFieldProps> = ({
  placeholder,
  field,
  required = false,
  register,
  errorsField,
  errorsMessageField,
  isEmail,
  disabled = false,
  showIconLeft = false,
  onChange
}) => {
  const classes = useStyles();
  return (
    <TextField
      fullWidth
      autoFocus
      disabled={disabled}
      type="number"
      placeholder={placeholder}
      className={classes.input}
      name={field}
      InputProps={{
        startAdornment: showIconLeft ? (
          <InputAdornment position="start">
            <AttachMoneyIcon />
          </InputAdornment>
        ): null,
        disableUnderline: true
      }}
      {...register(field,{
        required: required ? "Required" : false,
        pattern: isEmail ? emailPattern : null
      })}
      required={errorsField ? true : false}
      error={errorsField ? true : false}
      helperText={errorsField && errorsMessageField}
      onChange={onChange ? onChange : () => {}}
    />
  );
}

export default CustomTextField;

