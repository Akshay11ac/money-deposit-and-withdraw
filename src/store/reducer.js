import { ACTION_TYPE } from "../utility/constant";

const initState = {
  depositedCurrency: [],
  withDrawCurrency: [],
  withDrawTransaction: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPE.DEPOSIT:
      return {
        ...state,
        depositedCurrency: depositMoney(
          state.depositedCurrency,
          action.payload
        ).sort((a, b) => (a.note < b.note ? 1 : -1)),
      };
    case ACTION_TYPE.WITHDRAW:
      return {
        ...state,
        withDrawCurrency: action.payload,
        depositedCurrency: balanceAfterWithDraw(
          state.depositedCurrency,
          action.payload
        ),
        withDrawTransaction: [...state.withDrawTransaction, action.payload],
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

const balanceAfterWithDraw = (currentBalance, withDrawMoney) => {
  let updateCurrencyBalance = currentBalance.map((data, idx) => {
    if (data.note === withDrawMoney[idx].note) {
      return { ...data, qty: data.qty - withDrawMoney[idx].qty };
    } else {
      return data;
    }
  });
  return updateCurrencyBalance;
};
