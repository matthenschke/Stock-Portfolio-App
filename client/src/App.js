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
  useEffect(() => {
    if (!loading) {
      axios
        .get("/hello")
        .then(res => {
          const { data } = res;
          console.log(data);
          setLoading(true);
        })
        .catch(err => console.log(err));
    }
  }, [loading]);
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
