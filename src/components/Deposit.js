import { CURRENCY_NOTES, ACTION_TYPE } from "../utility/constant";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const Deposit = () => {
  const [selectedCurrency, setCurrency] = useState();
  const [noOfNotes, setNoteQty] = useState();
  const depositedCurrency = useSelector((state) => state.depositedCurrency);
  const dispatch = useDispatch();

  const handleAddDeposit = () => {
    let currencyNotes = { note: selectedCurrency, qty: noOfNotes };
    dispatch({ type: ACTION_TYPE.DEPOSIT, payload: currencyNotes });
  };

  return (
    <main className="main-container">
      <header className="heading">Deposit</header>
      <section className="container">
        <div>
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
        <div>
          <label className="title">Select quantity</label>
          <input
            type="text"
            value={noOfNotes}
            onChange={(e) => {
              setNoteQty(e.target.value);
            }}
          />
        </div>
        <div>
          <button onClick={handleAddDeposit}>Add</button>
        </div>
      </section>
      <sectio>
        {depositedCurrency.length > 0 &&
          depositedCurrency.map((data, idx) => {
            return (
              <div key={idx}>
                {data.note}--{data.qty}
              </div>
            );
          })}
      </sectio>
    </main>
  );
};

export default Deposit;
