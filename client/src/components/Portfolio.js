import React from "react";

const Portfolio = props => {
  const { stocks } = props;
  let portfolioTotal = 0;
  let portfolio = stocks.map(stock => {
    const { ticker, qty, latestPrice, open: openingPrice } = stock;
    let colorClass = "";

    portfolioTotal += latestPrice * qty;

    if (openingPrice) {
      if (openingPrice > latestPrice) {
        colorClass = "text-danger";
      } else if (openingPrice < latestPrice) {
        colorClass = "text-success";
      } else {
        colorClass = "text-secondary";
      }
    }

    return (
      <li key={ticker} className={`${colorClass}`}>
        {`${ticker} - ${qty} Shares @`}
        <span className="pl-4">{latestPrice}</span>
        <hr />
      </li>
    );
  });

  return (
    <div className="portfolio">
      <h1 className="text-center">{`Portfolio ($${portfolioTotal.toFixed(
        2
      )})`}</h1>
      <ul className="ml-5 mt-5">{portfolio}</ul>
    </div>
  );
};

export default Portfolio;
