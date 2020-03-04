import React, { useEffect } from "react";
import axios from "axios";

const Portfolio = () => {
  // useEffect(
  //     https://cloud.iexapis.com/stable/stock/AAPL/quote?token
  // )
  return (
    <div className="portfolio">
      <h1 className="text-center">Portfolio ($5943.34)</h1>
      <ul className="ml-5 mt-5">
        <li>
          BUY(AAPL) - 6 Shares @ 300.00
          <hr />
        </li>
        <li>
          BUY(STWD) - 40 Shares @ 20.56
          <hr />
        </li>
        <li>
          BUY(AAPL) - 6 Shares @ 300.00
          <hr />
        </li>
        <li>
          BUY(STWD) - 40 Shares @ 20.56
          <hr />
        </li>
      </ul>
    </div>
  );
};

export default Portfolio;
