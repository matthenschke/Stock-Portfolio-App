import React, { useEffect } from "react";
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
        setStocks(stocks);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
      });
  }, [loading]);

  if (!loading) {
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
  } else {
    return <></>;
  }
};

export default Portfolio;
