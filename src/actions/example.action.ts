import { useReducer } from "react";

const SET_EXAMPLE_VALUE = "example/set_example";

interface SetExampleValue {
  type: typeof SET_EXAMPLE_VALUE;
  payload: string;
}

type ActionType = SetExampleValue;

const initialState = {
  valueTest: "test 1",
};

const reducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case SET_EXAMPLE_VALUE:
      return {
        ...state,
        valueTest: action.payload,
      };
    default:
      return state;
  }
};

export default function useExampleActions() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setExample = async (payload: string) => {
    dispatch({
      type: SET_EXAMPLE_VALUE,
      payload,
    });
  };
  return { setExample, state };
}
