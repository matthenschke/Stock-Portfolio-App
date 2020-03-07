import React from "react";
import "./App.css";

// importing react router dom and its components
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// importing react components
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Transactions from "./components/Transactions";
import Protected from "./components/Protected";
import Error from "./components/Error";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Protected exact path="/home" component={Home} />
        <Protected exact path="/transactions" component={Transactions} />
        <Route component={Error} />
      </Switch>
    </Router>
  );
}

export default App;
