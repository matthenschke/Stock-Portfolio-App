const express = require("express"); // express
const router = express.Router(); // set up express router for authentication
const { getStockInfo } = require("../middlewares/stocks");

router.get("/:symbol", getStockInfo);
module.exports = router;
