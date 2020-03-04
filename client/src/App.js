import React from "react";
import "./App.css";

// importing react router dom and its components
import { HashRouter, Switch, Route } from "react-router-dom";

// importing react components
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Transactions from "./components/Transactions";

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/transactions" component={Transactions} />
      </Switch>
    </HashRouter>
  );
}

export default App;
