import { Grid, Paper, Typography } from "@mui/material";
import { useStore } from "../../config/store/index";
import MainLayout from "../../Hoc/MainLayout";
import { useForm } from "react-hook-form";
import CustomSelect from "../../components/FormElements/CustomSelect/index";
import CustomTextField from "../../components/FormElements/CustomTextField/index";
import socketIOClient from "socket.io-client";
import { useEffect } from "react";
import { GridCellParams, GridColDef, GridEventListener } from "@mui/x-data-grid";
import DataTable from "../../components/DataTable/DataTable";
import { IExchangeRate } from "../../actions/exchanged.action";
import moment from "moment";
import { BootstrapButton, useStyles } from "./styles";
import Pagination from "@mui/material/Pagination";
import clsx from 'clsx';

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "datetime",
    headerName: "Date & Time",
    width: 150,
    headerAlign:"center",
            cellClassName: (params: GridCellParams<number>) =>
      clsx('super-app', {
        negative: params.id < 0,
        positive: params.id > 0,
      }),
    align: "center",
    renderCell: (params) =>
      `${moment(params.row.dateTime, "YYYYMMDD").fromNow()}`,
  },
  {
    field: "currency_from",
    headerName: "Currency From",
    headerAlign:"center",
    align: "center",
    width: 180,
  },
  {
    field: "amount_1",
    headerName: "Amount 1",
    headerAlign:"center",
    align: "center",
    width: 180,
  },
  {
    field: "currency_to",
    headerName: "Currency to",
    type: "number",
    headerAlign:"center",
    align: "center",
    width: 180,
  },
  {
    field: "amount_2",
    headerName: "Amount 2",
    headerAlign:"center",
    align: "center",
    width: 180,
  },
  {
    field: "type",
    headerName: "Type",
    headerAlign:"center",
    align: "center",
    width: 180,
    renderCell: (params) => {
      return (
        <Typography
          style={{
            color: params.row.type === "Live Price" ? "#49CD5E" : "#223CC7",
            fontWeight: "bold",
          }}
        >
          {params.row.type}
        </Typography>
      );
    },
  },
];

let chatRoomSocket: any;

export type ExchangeFormData = {
  currencyFrom: string;
  amount1: number;
  currencyTo: string;
  amount2: number;
  type: string;
};

export const Home = (): JSX.Element => {
  /* Styles */
  const classes = useStyles();

  /* Store */
  const {
    getHistoryExchange,
    storeExchange,
    state: { list, pagination, rate },
  } = useStore("useExhangeStore");

  /* Form */
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ExchangeFormData>({
    defaultValues: { amount1: 1, currencyTo: "USD" },
  });

  /* Functions */
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

  const updateUSDAmount = (
    currentAmount: number = 0,
    currencyFrom: string = ""
  ) => {
    const currencyFromState = currencyFrom || watch("currencyFrom");
    const amount1State = currentAmount || watch("amount1");
    const currentUsdRate: IExchangeRate = rate.find(
      (e: IExchangeRate) => e.type === currencyFromState
    );
    const value = Number(amount1State) * currentUsdRate.rate;
    setValue("amount2", Number(Math.round(value)));
  };

  const onAmount1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("event ", event.target.value);
    updateUSDAmount(Number(event.target.value));
  };

  const onCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateUSDAmount(0, event.target.value);
  };

  const onHeaderClick:
    | GridEventListener<"columnHeaderClick">
    | undefined = async (event) => {
    getHistoryExchange(pagination.currentPage, event.field);
  };

  /* Effects */
  useEffect(() => {
    const init = () => {
      chatRoomSocket = socketIOClient("http://localhost:8080/rate");
      chatRoomSocket.on("connect", () => {
        chatRoomSocket.emit("SuscribeExchangeChannel", {
          channelTest: "channel1",
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
    init();
  }, [getHistoryExchange]);

  useEffect(() => {
    if (rate.length) updateUSDAmount(); // eslint-disable-next-line
  }, [rate]);

  useEffect(() => {
    const run = async () => {
      getHistoryExchange();
    };
    run(); // eslint-disable-next-line
  }, []);

  return (
    <MainLayout>
      <Grid container justifyContent="center" spacing={6}>
        <Grid item xs={12}>
          <Paper>
            <Grid container justifyContent="center" spacing={4}>
              <Grid item xs={9}>
                <Typography className={classes.title}>Exchange</Typography>
              </Grid>
              <Grid item xs={9}>
                <form
                  className={classes.form}
                  onSubmit={handleSubmit(handleForm)}
                  noValidate
                >
                  <Grid container justifyContent="center" spacing={2}>
                    <Grid item xs={2}>
                      <Grid container>
                        <Grid
                          item
                          textAlign="left"
                          xs={24}
                          className={classes.text}
                        >
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
                            onChange={onCurrencyChange}
                          >
                            <option value={"BTC"} selected>
                              Bitcoin
                            </option>
                            <option value={"ETH"}> Ethereum </option>
                          </CustomSelect>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={2}>
                      <Grid container>
                        <Grid
                          item
                          textAlign="left"
                          xs={12}
                          className={classes.text}
                        >
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
                    <Grid item alignContent="center" alignSelf="center">
                      =
                    </Grid>
                    <Grid item xs={2}>
                      <Grid container>
                        <Grid
                          item
                          textAlign="left"
                          xs={24}
                          className={classes.text}
                        >
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
                        <Grid
                          item
                          textAlign="left"
                          xs={24}
                          className={classes.text}
                        >
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
                    <Grid item xs={2} className={classes.buttonContainer}>
                      <BootstrapButton type="submit" variant="contained">
                        Save
                      </BootstrapButton>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={9}>
                <Typography className={classes.title}>History</Typography>
              </Grid>
              <Grid item xs={9}>
                <DataTable
                  rows={list}
                  columns={columns}
                  onChangePage={onChangePage}
                  totalPages={pagination.totalPages}
                  onHeaderClick={onHeaderClick}
                />
                <Pagination
                  className={classes.paginationContainer}
                  count={pagination.totalPages}
                  onChange={onChangePage}
                  variant="outlined" shape="rounded"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </MainLayout>
  );
};
