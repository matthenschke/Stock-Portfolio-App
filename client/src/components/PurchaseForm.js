import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import auth from "../auth";

const PurchaseForm = () => {
  const [ticker, setTicker] = useState(null);
  const [qty, setQty] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
  };
  const { balance } = auth.activeUser;
  return (
    <div className="mt-5 purchase-form text-center">
      <h2>{`Cash - $${balance}`}</h2>
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
        <Button variant="primary" type="submit" className=" mt-3">
          Buy
        </Button>
      </Form>
    </div>
  );
};

export default PurchaseForm;
