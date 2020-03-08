const pool = require("../pool");

module.exports = {
  getUsers: (req, res, next) => {
    pool.query("SELECT * FROM users", function(err, rows) {
      if (err) {
        res.status(403).json("error");
      } else {
        res.status(200).json(rows);
      }
    });
  },
  addUser: (req, res, next) => {
    const { email, name, password } = req.body;
    pool.query(
      "INSERT INTO users (email, name, password) VALUES (?,?, SHA2(?, ?))",
      [email, name, password, Number(process.env.HASH_LENGTH)],
      function(err, result) {
        if (err) {
          res.status(401).json(err);
        } else {
          const { insertId: id } = result;
          pool.query(
            "SELECT id, name, email, balance FROM users WHERE id = ?",
            [id],
            function(err, rows) {
              if (err) {
                res.status(400).json(err);
              } else {
                res.status(200).json(rows[0]);
              }
            }
          );
        }
      }
    );
  },
  authenticateUser: (req, res, next) => {
    const { email, password } = req.body;
    pool.query(
      "SELECT id, name, email, balance FROM users WHERE email = ? and password = SHA2(?,?)",
      [email, password, Number(process.env.HASH_LENGTH)],
      function(err, rows) {
        if (err) {
          res.status(400).json("error");
        } else {
          if (rows.length == 0) {
            res.status(401).json("email or password is incorrect");
          } else {
            res.status(200).json(rows[0]);
          }
        }
      }
    );
  },

  updateBalance: (req, res, next) => {
    const { id } = req.body;
    pool.query(
      "UPDATE users SET balance = ? WHERE id = ?",
      [req.newBalance, id],
      function(err, rows) {
        if (err) {
          res.status(400).json(err);
        } else {
          next();
        }
      }
    );
  }
};
