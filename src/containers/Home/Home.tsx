import { Button, Chip, Grid } from "@mui/material";
import { useStore } from "../../config/store/index";
import MainLayout from "../../Hoc/MainLayout";
import { useForm } from "react-hook-form";
import CustomSelect from "../../components/FormElements/CustomSelect/index";
import CustomTextField from "../../components/FormElements/CustomTextField/index";
import { makeStyles } from "@material-ui/core/styles";
import socketIOClient from "socket.io-client";
import { useEffect } from "react";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/DataTable/DataTable";
import { IExchangeRate } from "../../actions/exchanged.action";
import moment from 'moment';

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "datetime",
    headerName: "Date & Time",
    width: 150,
    renderCell: (params) => `${moment(params.row.dateTime, "YYYYMMDD").fromNow()}`
  },
  {
    field: "currency_from",
    headerName: "Currency From",
    width: 150,
  },
  {
    field: "amount_1",
    headerName: "Amount 1",
    width: 150,
  },
  {
    field: "currency_to",
    headerName: "Currency to",
    type: "number",
    width: 150,
  },
  {
    field: "amount_2",
    headerName: "Amount 2",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    width: 150,
    renderCell: (params) => {
      return (
        <Chip
          label={params.row.type}
          style={{
            backgroundColor:
              params.row.type === "Live Price" ? "#49CD5E" : "#223CC7",
            color: "white",
            fontWeight: "bold",
            fontSize: "10px",
          }}
          size="small"
        />
      );
    },
  },
];

let chatRoomSocket: any;

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

export type ExchangeFormData = {
  currencyFrom: string;
  amount1: number;
  currencyTo: string;
  amount2: number;
  type: string;
};

export const Home = (): JSX.Element => {
  const classes = useStyles();

  const {
    getHistoryExchange,
    loading,
    storeExchange,
    state: { list, pagination, rate },
  } = useStore("useExhangeStore");
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ExchangeFormData>({
    defaultValues: { amount1: 1, currencyTo: "USD" },
  });

  const init = () => {
    chatRoomSocket = socketIOClient("http://localhost:8080/rate");
    chatRoomSocket.on("connect", () => {
      chatRoomSocket.emit("SuscribeExchangeChannel", {
        channelTest: "channel1",
        value: "example 1",
      });
    });
    chatRoomSocket.on(
      "refreshExchangeHistory",
      (data: { refresh: boolean }) => {
        console.log("data ", data);
        if (data.refresh) getHistoryExchange(1);
      }
    );
  };

  const handleForm = (form: ExchangeFormData) => {
    const parseForm = {
      ...form,
      type: "Exchanged",
      amount1: Number(form.amount1),
      amount2: Number(form.amount2),
    };
    storeExchange(parseForm);
  };

  const onChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    getHistoryExchange(value);
  };

  const onAmount1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("event ", event.target.value);
    updateUSDAmount(Number(event.target.value));
  };

  const updateUSDAmount = (currentAmount: number = 0) => {
    const currencyFromState = watch("currencyFrom");
    const amount1State = currentAmount || watch("amount1");
    const currentUsdRate: IExchangeRate = rate.find(
      (e: IExchangeRate) => e.type === currencyFromState
    );
    console.log("currencyFromState ", currencyFromState);
    console.log("currentUsdRate ", currentUsdRate);
    const value = Number(amount1State) * currentUsdRate.rate;
    setValue("amount2", Number(Math.round(value)));
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (rate.length) updateUSDAmount();
  }, [rate]);

  useEffect(() => {
    async function run() {
      getHistoryExchange();
    }
    run();
  }, []);

  return (
    <MainLayout>
      <Grid container>
        <Grid item xs={12}>
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
                      field="currencyFrom"
                      required
                      register={register}
                      errorsMessageField={
                        errors.currencyFrom && errors.currencyFrom.message
                      }
                    >
                      <option value={"BTC"} selected>
                        BTC
                      </option>
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
                      errorsMessageField={
                        errors.amount1 && errors.amount1.message
                      }
                      isEmail={false}
                      onChange={onAmount1}
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
                      field="currencyTo"
                      register={register}
                      disabled
                      errorsMessageField={
                        errors.currencyTo && errors.currencyTo.message
                      }
                    >
                      <option value={"USD"} selected>
                        USD
                      </option>
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
                      disabled
                      register={register}
                      errorsField={errors.amount2}
                      errorsMessageField={
                        errors.amount2 && errors.amount2.message
                      }
                      isEmail={false}
                      showIconLeft
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
        </Grid>

        <Grid item xs={12} style={{ marginTop: 50 }}>
          <DataTable
            rows={list}
            columns={columns}
            onChangePage={onChangePage}
            totalPages={pagination.totalPages}
          />
        </Grid>
      </Grid>
    </MainLayout>
  );
};
