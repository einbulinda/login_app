const express = require("express");
const mysql = require("mysql");
const hbs = require("hbs");
const path = require("path");
const cookieParser = require("cookie-parser");

const dotenv = require("dotenv");

// Creating a server with express module.
var app = express();

dotenv.config({ path: "./.env" });

// register partials
hbs.registerPartials(__dirname + "/views/partials");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// Serving static files for website
app.use(express.static("public"));

// getting url encoded bodies sent by HTML Forms
app.use(express.urlencoded({ extended: false }));

// Parse JSON bodies (sent by API clients)
app.use(express.json());

// initializing cookie to use them in browser
app.use(cookieParser());

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

// Defining Routes
app.use("/", require("./routes/pages"));
app.use("/register", require("./routes/pages"));
app.use("/signin", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
