import { BUTTON_TYPE } from "../utility/constant";
import { useHistory } from "react-router-dom";

const Header = () => {
  const buttons = [BUTTON_TYPE.DEPOSIT, BUTTON_TYPE.WITHDRAW];
  const route = useHistory();

  const handleBtnClick = (routeTo) => {
    let url = routeTo === BUTTON_TYPE.DEPOSIT ? "/" : routeTo;
    route.push(url);
  };

  return (
    <div>
      {buttons.map((data, idx) => (
        <button key={idx} onClick={() => handleBtnClick(data)}>
          {data}
        </button>
      ))}
    </div>
  );
};

export default Header;
