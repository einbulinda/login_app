var express = require("express");
var ejs = require("ejs");
var mysql = require("mysql");
const dotenv = require("dotenv");

// Creating a server with express module.
var app = express();

dotenv.config({ path: "./.env" });

// set view engine to ejs
app.set("view engine", "ejs");

// Serving static files for website
app.use(express.static("public"));

// DB Connection details
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});

// Connecting to DB
db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Database Connected...");
  }
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/signin", (req, res) => {
  res.render("signin");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
