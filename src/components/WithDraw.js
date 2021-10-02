import { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ACTION_TYPE } from "../utility/constant";
import CurrencyNotes from "./CurrencyNotes";

const WithDraw = () => {
  const { withDrawCurrency, depositedCurrency } = useSelector((state) => state);
  const [withDrawAmt, setWithDrawAmt] = useState();
  const dispatch = useDispatch();

  const handleWithDraw = () => {
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
      console.log("Please select the money in available demonation");
    } else {
      dispatch({
        type: ACTION_TYPE.WITHDRAW,
        payload: withDrawAmount,
      });
    }
  };

  return (
    <main className="main-container">
      <header className="heading">WithDraw</header>
      <section className="container">
        <input
          type="text"
          value={withDrawAmt}
          onChange={(e) => setWithDrawAmt(e.target.value)}
          placeholder="Enter amount to withdraw"
        />
        <button onClick={handleWithDraw}>WithDraw</button>
      </section>
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
