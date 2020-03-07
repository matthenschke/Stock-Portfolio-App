const express = require("express"); // express
const router = express.Router(); // set up express router for authentication
const {
  getStockInfo,
  buyStocks,
  getDistinctStocks,
  createPortfolio,
  addTransaction,
  getTransactions
} = require("../middlewares/stocks");
const { updateBalance } = require("../middlewares/users");

router.post("/buy", getStockInfo, buyStocks, updateBalance, addTransaction);

router.get("/transactions/:id", getTransactions);

router.get("/portfolio/:id", getDistinctStocks, createPortfolio);
module.exports = router;
