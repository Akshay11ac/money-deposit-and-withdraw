import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ACTION_TYPE, CURRENCY } from "../utility/constant";
import CurrencyNotes from "./CurrencyNotes";
import { balance } from "../utility/helper";
import Error from "./Error";
import ComponentHeader from "./ComponentHeader";

const WithDraw = () => {
  const { withDrawCurrency, depositedCurrency, withDrawTransaction } =
    useSelector((state) => state);
  const [withDrawAmt, setWithDrawAmt] = useState();
  const dispatch = useDispatch();
  const [withDrawError, setWithDrawError] = useState("");
  const [btnStatus, setBtnStatus] = useState(true);

  useEffect(() => {
    if (withDrawAmt && withDrawAmt > 0 && !isNaN(withDrawAmt)) {
      setBtnStatus(false);
    }
  }, [withDrawAmt]);

  const handleWithDraw = () => {
    if (withDrawAmt > balance(depositedCurrency)) {
      return setWithDrawError("Insufficient Balance");
    } else {
      setWithDrawError("");
      let currentWithDraw = parseInt(withDrawAmt);
      let withDrawAmount = depositedCurrency.map((data) => {
        let numberOfNotes = Math.floor(currentWithDraw / data.note);
        if (
          data.note <= currentWithDraw &&
          data.qty > 0 &&
          numberOfNotes <= data.qty
        ) {
          currentWithDraw = currentWithDraw - data.note * numberOfNotes;
          return { note: data.note, qty: numberOfNotes };
        } else {
          return { note: data.note, qty: 0 };
        }
      });
      if (currentWithDraw) {
        return setWithDrawError(
          "Please select the withdraw money in available currency notes"
        );
      } else {
        dispatch({
          type: ACTION_TYPE.WITHDRAW,
          payload: withDrawAmount,
        });
      }
    }
  };

  return (
    <main className="main-container">
      <ComponentHeader title="WithDraw" amount={depositedCurrency} />
      <section className="container withDraw-section">
        <div className="currency">
          <label className="title">WithDraw Amount</label>
          <input
            type="number"
            value={withDrawAmt}
            onChange={(e) => setWithDrawAmt(e.target.value)}
            placeholder="Enter amount"
            min={1}
          />
        </div>
        <div className="btn-container">
          <button
            className="button-cs"
            onClick={handleWithDraw}
            disabled={btnStatus}
          >
            WithDraw
          </button>
        </div>
      </section>
      {withDrawError && <Error error={withDrawError} />}
      {withDrawCurrency && withDrawCurrency.length > 0 && !withDrawError && (
        <section className="table-container">
          <label className="title">WithDraw Currency Notes</label>
          <CurrencyNotes currencies={withDrawCurrency} />
        </section>
      )}
      {withDrawTransaction && withDrawTransaction.length > 0 && (
        <section className="transaction-container">
          <label className="title">Transaction</label>
          <div className="currency-container">
            {withDrawTransaction.map((data, idx) => {
              return (
                <div className="transaction currency-item">
                  <div>Transaction-{idx + 1}</div>
                  <div>
                    Amount- {CURRENCY}{" "}
                    {data.reduce((acc, current) => {
                      return acc + current.note * current.qty;
                    }, 0)}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
};

export default WithDraw;
