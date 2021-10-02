import { CURRENCY_NOTES, ACTION_TYPE } from "../utility/constant";
import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CurrencyNotes from "./CurrencyNotes";

const Deposit = () => {
  const [selectedCurrency, setCurrency] = useState();
  const [noOfNotes, setNoteQty] = useState();
  const depositedCurrency = useSelector((state) => state.depositedCurrency);
  const dispatch = useDispatch();

  const handleAddDeposit = () => {
    let currencyNotes = {
      note: parseInt(selectedCurrency),
      qty: parseInt(noOfNotes),
    };
    dispatch({ type: ACTION_TYPE.DEPOSIT, payload: currencyNotes });
  };

  return (
    <main className="main-container">
      <header className="heading">Deposit</header>
      <section className="container">
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
                {data.note}
              </option>
            ))}
          </select>
        </div>
        <div className="quantity">
          <label className="title">Select quantity</label>
          <input
            type="text"
            value={noOfNotes}
            onChange={(e) => {
              setNoteQty(e.target.value);
            }}
            placeholder="Add number of notes"
          />
        </div>
        <div>
          <button onClick={handleAddDeposit}>Add</button>
        </div>
      </section>
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
