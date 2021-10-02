import { ACTION_TYPE } from "../utility/constant";

const initState = { depositedCurrency: [] };

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPE.DEPOSIT:
      return {
        ...state,
        depositedCurrency: depositMoney(
          state.depositedCurrency,
          action.payload
        ),
      };
    default:
      return state;
  }
};

export default reducer;

const depositMoney = (currency, newDeposit) => {
  let isCurrencyPresent =
    currency &&
    currency.some((data) => data.note === newDeposit.note && data.qty > 0);

  if (isCurrencyPresent) {
    let updateCurrencyQty = currency.map((data) => {
      if (data.note && data.note === newDeposit.note && data.qty > 0) {
        return { ...data, qty: data.qty + newDeposit.qty };
      } else {
        return data;
      }
    });
    return updateCurrencyQty;
  } else {
    return [...currency, { note: newDeposit.note, qty: newDeposit.qty }];
  }
};
