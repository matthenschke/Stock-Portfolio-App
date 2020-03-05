const express = require("express"); // express

const router = express.Router(); // set up express router for authentication

const { addUser, authenticateUser, getUsers } = require("../middlewares/users");

router.get("/", getUsers);
router.post("/signup", addUser);
router.post("/login", authenticateUser);

module.exports = router;
