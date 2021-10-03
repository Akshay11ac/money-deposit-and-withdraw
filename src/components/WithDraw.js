import { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ACTION_TYPE } from "../utility/constant";
import CurrencyNotes from "./CurrencyNotes";
import { balance } from "../utility/helper";
import Error from "./Error";

const WithDraw = () => {
  const { withDrawCurrency, depositedCurrency } = useSelector((state) => state);
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
          "Please select the money in available demonation"
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
      <header className="heading">WithDraw</header>
      <section className="container">
        <input
          type="number"
          value={withDrawAmt}
          onChange={(e) => setWithDrawAmt(e.target.value)}
          placeholder="Enter amount to withdraw"
        />
        <button
          className="button-cs"
          onClick={handleWithDraw}
          disabled={btnStatus}
        >
          WithDraw
        </button>
      </section>
      <section>
        <h4 className="title">Balance: {balance(depositedCurrency) ?? ""}</h4>
      </section>
      {withDrawError && <Error error={withDrawError} />}
      <section>
        {withDrawCurrency && withDrawCurrency.length > 0 && (
          <Fragment>
            <label>WithDraw denomination currency</label>
            <CurrencyNotes currencies={withDrawCurrency} />
          </Fragment>
        )}
      </section>
    </main>
  );
};

export default WithDraw;
