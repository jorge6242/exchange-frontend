import { Button, Grid } from "@mui/material";
import { useStore } from "../../config/store/index";
import MainLayout from "../../Hoc/MainLayout";
import { useForm } from "react-hook-form";
import CustomSelect from "../FormElements/CustomSelect/index";
import CustomTextField from "../FormElements/CustomTextField/index";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

type FormData = {
  exchange1: string;
  amount1: string;
  exchange2: string;
  amount2: string;
};

export const Home = (): JSX.Element => {
  const classes = useStyles();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();

  const handleForm = (form: object) => {
    console.log("form ", form);
  };

  return (
    <MainLayout>
      <form
        className={classes.form}
        onSubmit={handleSubmit(handleForm)}
        noValidate
      >
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={2}>
            <Grid container>
              <Grid item textAlign="left" xs={24}>
                Currency from
              </Grid>
              <Grid item xs={24}>
                <CustomSelect
                  field="exchange1"
                  required
                  register={register}
                  errorsMessageField={
                    errors.exchange1 && errors.exchange1.message
                  }
                >
                  <option value={"BTC"}> BTC </option>
                  <option value={"ETH"}> ETH </option>
                </CustomSelect>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Grid container>
              <Grid item textAlign="left" xs={24}>
                Amount
              </Grid>
              <Grid item xs={24}>
                <CustomTextField
                  placeholder="Description"
                  field="amount1"
                  required
                  register={register}
                  errorsField={errors.amount1}
                  errorsMessageField={errors.amount1 && errors.amount1.message}
                  isEmail={false}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item alignContent="center">
            =
          </Grid>
          <Grid item xs={2}>
            <Grid container>
              <Grid item textAlign="left" xs={24}>
                Currency to
              </Grid>
              <Grid item xs={24}>
                <CustomSelect
                  field="exchange2"
                  required
                  register={register}
                  errorsMessageField={
                    errors.exchange1 && errors.exchange1.message
                  }
                >
                  <option value={"BTC"}> BTC </option>
                  <option value={"ETH"}> ETH </option>
                </CustomSelect>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Grid container>
              <Grid item textAlign="left" xs={24}>
                Amount
              </Grid>
              <Grid item xs={24}>
                <CustomTextField
                  placeholder="Description"
                  field="amount2"
                  required
                  register={register}
                  errorsField={errors.amount1}
                  errorsMessageField={errors.amount1 && errors.amount1.message}
                  isEmail={false}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </MainLayout>
  );
};
