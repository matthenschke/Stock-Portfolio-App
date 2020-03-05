const express = require("express"); // express
const router = express.Router(); // create router

router.use("/users", require("./users")); // user routes
router.use("/stocks", require("./stocks")); // stocks profile

module.exports = router;
