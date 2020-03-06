const express = require("express"); // express
const router = express.Router(); // set up express router for authentication
const {
  getStockInfo,
  buyStocks,
  addToPortfolio,
  addTransaction
} = require("../middlewares/stocks");
const { updateBalance } = require("../middlewares/users");

router.post(
  "/buy",
  getStockInfo,
  buyStocks,
  updateBalance,
  //   addToPortfolio,
  addTransaction
);
module.exports = router;
