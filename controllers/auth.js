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

// user login function
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    //   if user is submitting without email/password
    if (!email || !password) {
      return res
        .status(400)
        .render("signin", { message: "Please provide an email and password." });
    }
    db.query(
      "SELECT * FROM users WHERE email=?",
      [email],
      async (error, result) => {
        console.log(result);
        if (!result || !(await bcrypt.compare(password, result[0].password))) {
          res
            .status(401)
            .render("signin", { message: "Incorrect email or password." });
        } else {
          const id = result[0].id;
          // unique tokens for logged in users
          const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
          });
          console.log(`The token is ${token}`);
          const cookieOptions = {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true /*only allow cookies on http browser only */,
          };
          // setting up cookie in browser
          res.cookie("jwt", token, cookieOptions);
          // redirect user to home page after login
          res.status(200).redirect("/");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// user registration function
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
