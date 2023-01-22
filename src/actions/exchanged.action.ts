import { useReducer } from "react";
import axiosInstance from "../config/store/Axios";
import { ExchangeFormData } from "../containers/Home/Home";

const GET_HISTORY_EXCHANGED = "exchange/history";
const SET_LOADING = "exchange/loading";

interface GetExchangeHistory {
  type: typeof GET_HISTORY_EXCHANGED;
  payload: {
    list: IExchanged[];
    pagination: IPagination;
    rate: IExchangeRate[];
  };
}

interface SetLoading {
  type: typeof SET_LOADING;
  payload: boolean;
}

type ActionType = GetExchangeHistory | SetLoading;

interface IExchanged {
  dateTime: string;
  id: number;
  currency_from: string;
  amount_1: number;
  currency_to: string;
  amount_2: number;
  type: string | null;
}

interface IPagination {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
}

export interface IExchangeRate {
  type: string;
  rate: number;
}

export type IState = {
  list: IExchanged[];
  loading: boolean;
  pagination: IPagination;
  rate: IExchangeRate[];
};

const initialState: IState = {
  list: [],
  loading: false,
  rate: [],
  pagination: {
    itemsPerPage: 0,
    totalItems: 0,
    currentPage: 0,
    totalPages: 0,
  },
};

const reducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case GET_HISTORY_EXCHANGED:
      return {
        ...state,
        list: action.payload.list,
        pagination: action.payload.pagination,
        rate: action.payload.rate,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default function useExhangeActions() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const getHistoryExchange = async (page: number = 1) => {
    const response = await axiosInstance.get("/transaction", {
      params: { page, limit: 6 },
    });
    dispatch({
      type: GET_HISTORY_EXCHANGED,
      payload: {
        list: response.data.data,
        pagination: response.data.meta,
        rate: response.data.rate,
      },
    });
  };

  const setLoading = async (payload: boolean) => {
    dispatch({
      type: SET_LOADING,
      payload,
    });
  };

  const storeExchange = async (body: ExchangeFormData) => {
    const response = await axiosInstance.post("/transaction", body);
    if (response) getHistoryExchange(state.pagination.currentPage);
  };

  return { getHistoryExchange, setLoading, storeExchange, state };
}
