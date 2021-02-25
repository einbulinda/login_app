const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// centralize the connection in an external file
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});

exports.register = (req, res) => {
  console.log(req.body);
  // getting the values of fields via JS destructuring
  const {
    firstName,
    lastName,
    password,
    confirmPassword,
    email,
    gender,
  } = req.body;
  // for avoiding sql injections (security to prevent duplicate entries)
  db.query(
    "SELECT email FROM users WHERE email=?",
    [email],
    async (error, result) => {
      if (error) {
        console.log(error);
      }
      if (result.length > 0) {
        // return keyword stops the rest of code from executing.
        return res.render("register", {
          message: "User email is already registered with an account.",
        });
      } else if (password !== confirmPassword) {
        return res.render("register", {
          message: "Passwords provided are not identical",
        });
      }
      let hashedPassword = await bcrypt.hash(password, 8);
      console.log(hashedPassword);
      db.query(
        " INSERT INTO users SET ?",
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: hashedPassword,
        },
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            console.log(results);
            return res.render("register", {
              message: "User registered successfully.",
            });
          }
        }
      );
    }
  );
};
