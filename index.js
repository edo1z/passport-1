var express = require("express");
var passport = require("passport");
var session = require("express-session");
var authRouter = require("./auth");

var app = express();
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "secret123",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.authenticate("session"));
app.use("/", authRouter);
app.listen(3015, function () {
  console.log("Server is listening on port 3015");
});
