import { CURRENCY } from "../utility/constant";
import { balance } from "../utility/helper";

const ComponentHeader = ({ title, amount }) => {
  return (
    <section className="heading">
      <h3>{title}</h3>
      <h4>
        Your Balance is: {CURRENCY} {balance(amount)}
      </h4>
    </section>
  );
};

export default ComponentHeader;
