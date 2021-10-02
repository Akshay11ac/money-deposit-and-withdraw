import { BUTTON_TYPE } from "../utility/constant";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const buttons = [BUTTON_TYPE.DEPOSIT, BUTTON_TYPE.WITHDRAW];
  const route = useHistory();
  const [activePage, setActivePage] = useState(BUTTON_TYPE.DEPOSIT);

  const handleBtnClick = (routeTo) => {
    let url = routeTo === BUTTON_TYPE.DEPOSIT ? "/" : routeTo;
    route.push(url);
    setActivePage(routeTo);
  };

  return (
    <header className="header-container">
      {buttons.map((data, idx) => (
        <button
          key={idx}
          onClick={() => handleBtnClick(data)}
          className={`header-btn ${activePage === data && "active-btn"}`}
        >
          {data}
        </button>
      ))}
    </header>
  );
};

export default Header;
