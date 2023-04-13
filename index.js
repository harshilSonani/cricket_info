const { urlencoded } = require("express");
const express = require("express");
const mongoose = require("./config/mongoose");
const cookie = require("cookie-parser");
const port = 8001;

const app = express();


const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const session = require("express-session");
const flash = require("connect-flash");
const flashMiddleware = require("./config/flashMiddleware");

app.use(urlencoded());
app.use(cookie());

app.use(express.static("assets"));
app.set("view engine", "ejs");

app.use(
  session({
    name: "harshil",
    secret: "RNW",
    saveUninitialized: false,
    resave: true,
    cookie: {
      maxAge: 60 * 100 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuth);
app.use(flash());
app.use(flashMiddleware.set);

app.use("/", require("./route/indexRouter"));

app.listen(port, (err) => {
  if (err) {
    console.log("server is not response");
    return false;
  }
  console.log("server is respoding", port);
});
