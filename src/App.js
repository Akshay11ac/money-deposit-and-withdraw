import "./App.css";
import { Route, Switch } from "react-router-dom";
import Deposit from "./components/Deposit";
import WithDraw from "./components/WithDraw";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <Deposit />
        </Route>
        <Route exact path="/WithDraw">
          <WithDraw />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
