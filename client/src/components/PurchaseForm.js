import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../actions";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const PurchaseForm = () => {
  const [ticker, setTicker] = useState(null);
  const [qty, setQty] = useState(null);
  const [msg, setMsg] = useState(null);

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const { id, balance } = user;
  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("/stocks/buy", { ticker, qty, id, type: "BUY" })
      .then(response => {
        if ((response.status = 200)) {
          dispatch(actions.updateBalance(response.data));
          setMsg(<p className="mt-3 text-success">Purchased Successful</p>);
        }
      })
      .catch(e =>
        setMsg(
          <p className="mt-3 text-danger">
            Insufficient funds or Ticker not found
          </p>
        )
      );
  };
  return (
    <div className="mt-5 purchase-form text-center">
      <h2>{`Cash - $${balance.toFixed(2)}`}</h2>
      <Form className="mt-5" onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          className="mt-3"
          placeholder="Ticker"
          onChange={e => setTicker(e.target.value)}
          required
        />
        <Form.Control
          className="mt-3"
          type="number"
          placeholder="Qty"
          min="1"
          required
          onChange={e => setQty(e.target.value)}
        />
        {msg && msg}
        <Button variant="primary" type="submit" className=" mt-3">
          Buy
        </Button>
      </Form>
    </div>
  );
};

export default PurchaseForm;
