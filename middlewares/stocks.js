const pool = require("../pool");
const axios = require("axios");
module.exports = {
  getStockInfo: (req, res, next) => {
    const { ticker } = req.body;
    axios
      .get(
        `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${process.env.API_KEY}`
      )
      .then(response => {
        const { latestPrice: unitPrice } = response.data;
        req.unitPrice = unitPrice;
        next();
      })
      .catch(e => {
        res.status(404).json("Stock Not found");
      });
  },

  buyStocks: (req, res, next) => {
    const { qty, id } = req.body;
    req.total = Number(req.unitPrice * qty).toFixed(2);
    pool.query("SELECT balance FROM users WHERE id = ?", [id], function(
      err,
      rows
    ) {
      if (err) {
        res.status(400).json(err);
      } else if (rows.length == 0) {
        res.status(400).json("user not found");
      } else {
        const { balance } = rows[0];
        const difference = balance - req.total;
        if (difference < 0) {
          res.status(401).json("Insufficient funds!!");
        } else {
          req.newBalance = difference;
          next();
        }
      }
    });
  },
  // addToPortfolio: (req, res, next) => {
  //   const { ticker, qty, id } = req.body;
  //   pool.query(
  //     "INSERT INTO ownership (user_id, ticker, qty) VALUES (?,?,?)",
  //     [id, ticker, qty],
  //     function(err, rows) {
  //       if (err) {
  //         res.status(400).json(err);
  //       } else {
  //         next();
  //       }
  //     }
  //   );
  // }
  //   query for portfolio
  //   select distinct ticker, SUM(qty) from transactions
  // GROUP BY ticker

  addTransaction: (req, res, next) => {
    const { ticker, qty, id, type } = req.body;
    pool.query(
      "INSERT INTO transactions (user_id, ticker, unit_price, qty, type, timestamp) VALUES (?,?,?, ?, ?, ?)",
      [id, ticker, req.unitPrice, qty, type, new Date()],
      function(err, rows) {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(200).json("transaction complete");
        }
      }
    );
  }
};
