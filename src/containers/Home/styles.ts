import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

export const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.3,
  borderRadius: 8,
  backgroundColor: "#49CD5E",
  borderColor: "#49CD5E",
  marginTop: 5,
  "&:hover": {
    backgroundColor: "#49CD5E",
    borderColor: "#49CD5E",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#49CD5E",
    borderColor: "#49CD5E",
  },
  "&:focus": {
    boxShadow: "none",
  },
});

export const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  text: {
    color: "#9C9C9C",
    fontSize: 14,
    paddingBottom: 5,
  },
  title: {
    paddingLeft: 10,
    "&.MuiTypography-root": {
      fontSize: 24,
      fontWeigth: "bold",
    },
  },
  buttonContainer: {
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#9C9C9C",
    "&:hover": {
      backgroundColor: "#0069d9",
      borderColor: "#0062cc",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  },
  paginationContainer: {
    marginTop: 10,
    marginBottom: 10,
    '&.MuiPaginationItem-previousNext': {
        backgroundColor: 'black'
    }
  }
}));
