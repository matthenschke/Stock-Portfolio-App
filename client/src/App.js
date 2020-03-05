import React, { useEffect, useState } from "react";
import "./App.css";

// importing react router dom and its components
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// importing react components
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Transactions from "./components/Transactions";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(false);
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/transactions" component={Transactions} />
      </Switch>
    </Router>
  );
}

export default App;
