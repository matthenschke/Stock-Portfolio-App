import React from "react";

const Portfolio = props => {
  const { stocks } = props;
  let portfolio = stocks.map(stock => {
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
        {`${ticker} - ${qty} Shares @`}
        <span className="pl-4">{latestPrice}</span>
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
};

export default Portfolio;
