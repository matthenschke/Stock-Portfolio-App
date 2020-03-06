const pool = require("../pool");
const axios = require("axios");
module.exports = {
  getStockInfo: (req, res, next) => {
    const { symbol } = req.params;
    axios
      .get(
        `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${process.env.API_KEY}`
      )
      .then(response => {
        res.status(200).json(response.data);
      })
      .catch(e => {
        res.status(404).json("Not found");
      });
  }
};
