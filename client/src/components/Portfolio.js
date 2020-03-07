import React, { useEffect, useState } from "react";
import axios from "axios";
import auth from "../auth";

const Portfolio = () => {
  const [stocks, setStocks] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = auth.activeUser;

  useEffect(() => {
    axios
      .get(`/stocks/portfolio/${id}`)
      .then(response => {
        const { data: stocks } = response;
        console.log(stocks);
        setStocks(stocks);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
      });
  }, [loading]);

  if (!loading) {
    let portfolio = stocks.map(stock => {
      console.log(stock);
      const { ticker, qty, latestPrice, open: openingPrice } = stock;
      let classes = "";

      if (openingPrice) {
        if (openingPrice > latestPrice) {
          classes = "text-danger";
        } else if (openingPrice < latestPrice) {
          classes = "text-success";
        } else {
          classes = "text-secondary";
        }
      }

      return (
        <li key={ticker} className={`${classes}`}>
          <span className={classes}></span>
          {`${ticker} - ${qty} Shares @   ${latestPrice}`}
          <hr />
        </li>
      );
    });
    return (
      <div className="portfolio">
        <h1 className="text-center">Portfolio ($5943.34)</h1>
        <ul className="ml-5 mt-5">{portfolio}</ul>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Portfolio;
