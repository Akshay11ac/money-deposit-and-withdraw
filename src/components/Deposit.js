import { CURRENCY_NOTES, ACTION_TYPE, CURRENCY } from "../utility/constant";
import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CurrencyNotes from "./CurrencyNotes";
import { balance } from "../utility/helper";
import Error from "./Error";

const Deposit = () => {
  const [selectedCurrency, setCurrency] = useState();
  const [noOfNotes, setNoteQty] = useState();
  const depositedCurrency = useSelector((state) => state.depositedCurrency);
  const dispatch = useDispatch();
  const [btnStatus, setBtnStatus] = useState(true);
  const [depositError, setDepositError] = useState("");

  useEffect(() => {
    if (selectedCurrency && noOfNotes > 0 && !isNaN(noOfNotes)) {
      setBtnStatus(false);
    }
  }, [selectedCurrency, noOfNotes]);

  const handleAddDeposit = () => {
    if (selectedCurrency && noOfNotes > 0 && !isNaN(noOfNotes)) {
      setDepositError("");
      let currencyNotes = {
        note: parseInt(selectedCurrency),
        qty: parseInt(noOfNotes),
      };
      dispatch({ type: ACTION_TYPE.DEPOSIT, payload: currencyNotes });
    } else {
      setBtnStatus(true);
      setDepositError("Invalid input. Please try again");
    }
  };

  return (
    <main className="main-container">
      <header className="heading">Deposit</header>
      <section className="container">
        <div className="input-container">
          <div className="currency">
            <label className="title">Denomination Currency</label>
            <select
              onChange={(e) => {
                setCurrency(e.target.value);
              }}
              value={selectedCurrency}
            >
              <option value="" selected disabled>
                Select
              </option>
              {CURRENCY_NOTES.map((data, idx) => (
                <option key={idx} value={data.note}>
                  {CURRENCY} {data.note}
                </option>
              ))}
            </select>
          </div>
          <div className="quantity">
            <label className="title">Select quantity</label>
            <input
              type="number"
              value={noOfNotes}
              onChange={(e) => {
                setNoteQty(e.target.value);
              }}
              placeholder="Add number of notes"
              min={0}
            />
          </div>
        </div>
        <div className="btn-container">
          <button
            className="button-cs"
            onClick={handleAddDeposit}
            disabled={btnStatus}
          >
            Add
          </button>
        </div>
      </section>
      <section>
        <h4 className="title">Balance: {balance(depositedCurrency) ?? ""}</h4>
      </section>
      {depositError && <Error error={depositError} />}
      <section>
        {depositedCurrency && depositedCurrency.length > 0 && (
          <Fragment>
            <label>Available Denomination</label>
            <CurrencyNotes currencies={depositedCurrency} />
          </Fragment>
        )}
      </section>
    </main>
  );
};

export default Deposit;
