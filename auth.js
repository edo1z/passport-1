var express = require("express");
var passport = require("passport");
var LocalStrategy = require("passport-local");

var router = express.Router();

passport.use(
  new LocalStrategy(function verify(username, password, cb) {
    console.log("LocalStrategy", username, password);
    return cb(null, { id: 1, username: "test" });
  })
);

passport.serializeUser(function (user, cb) {
  console.log("serializeUser", user);
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  console.log("deserializeUser", user);
  process.nextTick(function () {
    return cb(null, user);
  });
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.post(
  "/login/password",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

module.exports = router;
