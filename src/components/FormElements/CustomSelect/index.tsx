import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  select: {
    padding: "4px 0px 9px 0px",
    width: " 100%",
    backgroundColor: "transparent",
    border: "1px solid #E0E0E0",
    borderRadius: 8,
    fontSize: "16px",
    "&:hover": {
      outline: 0,
    },
  },
  message: {
    marginTop: "4px",
    fontSize: "0.75rem",
    minHeight: "1em",
    textAlign: "left",
    lineHeight: "1em",
    letterSpacing: "0.03333em",
  },
}));

interface IProps {
  field: string;
  required?: boolean;
  register: any;
  errorsMessageField: any;
  children: any;
  disabled?: boolean;
  onChange?: Function
}

const CustomSelect: React.FC<IProps> = ({
  field,
  required = false,
  register,
  errorsMessageField,
  children,
  disabled = false,
  onChange,
}) => {
  const classes = useStyles();
  return (
    <div>
      <select
        className={classes.select}
        {...register(field, { required: required ? "Required" : false })}
        name={field}
        disabled={disabled}
        onChange={onChange ? onChange : () => {}}
      >
        <option value="">Select option</option>
        {children}
      </select>
      <div className={classes.message}>{errorsMessageField}</div>
    </div>
  );
};

export default CustomSelect;
