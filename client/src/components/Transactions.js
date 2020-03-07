import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import auth from "../auth";

const Transactions = () => {
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = auth.activeUser;

  useEffect(() => {
    axios
      .get(`/stocks/transactions/${id}`)
      .then(response => {
        const { data: transactions } = response;
        setTransactions(transactions);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
      });
  }, [loading]);

  if (!loading) {
    let list = transactions.map(transaction => {
      const { id, ticker, type, qty, unit_price: unitPrice } = transaction;
      return (
        <li key={id}>
          {`${type}(${ticker}) - ${qty} Shares @ ${unitPrice.toFixed(2)}`}
          <hr />
        </li>
      );
    });
    return (
      <>
        <Navbar />
        <div className="transactions ">
          <h1 className="text-center">Transactions</h1>
          <ul className="ml-5 mt-5">{list}</ul>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default Transactions;
