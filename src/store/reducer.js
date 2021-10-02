import { ACTION_TYPE } from "../utility/constant";

const initState = { depositedCurrency: [] };

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPE.DEPOSIT:
      return {
        ...state,
        depositedCurrency: [...state.depositedCurrency, action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
