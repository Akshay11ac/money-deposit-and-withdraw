export const balance = (depositedCurrency) => {
  return depositedCurrency.reduce((acc, current) => {
    return acc + current.note * current.qty;
  }, 0);
};
