import { CURRENCY_NOTES } from "../utility/constant";
import { useState, Fragment } from "react";

const Deposit = () => {
  const [selectedCurrency, setCurrency] = useState();
  const [noOfNotes, setNoteQty] = useState();

  const handleAddDeposit = () => {
    console.log(selectedCurrency, noOfNotes);
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
    </main>
  );
};

export default Deposit;
