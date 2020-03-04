import React from "react";
import { Form, Button } from "react-bootstrap";

const PurchaseForm = () => {
  return (
    <div className="mt-5 purchase-form text-center">
      <h2>Cash - $5,000</h2>
      <Form className="mt-5">
        <Form.Control
          type="text"
          className="mt-3"
          placeholder="Ticker"
          required
        />
        <Form.Control
          className="mt-3"
          type="number"
          placeholder="Qty"
          min="1"
          required
        />
        <Button variant="primary" type="submit" className=" mt-3">
          Buy
        </Button>
      </Form>
    </div>
  );
};

export default PurchaseForm;
