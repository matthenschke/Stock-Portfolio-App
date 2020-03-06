import React from "react";
import Navbar from "./Navbar";

const Transactions = () => {
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, [loading]);

  if (!loading) {
    return (
      <>
        <Navbar />
        <div className="transactions ">
          <h1 className="text-center">Transactions</h1>
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
      </>
    );
  } else {
    <></>;
  }
};

export default Transactions;
