/* Impoer Packages */
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

/* Model Database */
const User = require("../models/user");

/* Helpers */
const { errorHandler } = require("../helpers/errorHelper");
const objectHelper = require("../helpers/objectHelper");

const signUp = (req, res, next) => {
  const { body } = req;
  if (objectHelper.isEmpty(body)) {
    return res.status(400).json({ message: "Missing body" });
  }
  const { email, password, firstName, lastName, address, phoneNumber } = body;
  if (!!email === false) {
    return res.status(400).json({ message: "Missing email" });
  }
  if (!!password === false) {
    return res.status(400).json({ message: "Missing password" });
  }
  if (!!firstName === false) {
    return res.status(400).json({ message: "Missing firstName" });
  }
  if (!!lastName === false) {
    return res.status(400).json({ message: "Missing lastName" });
  }
  if (!!address === false) {
    return res.status(400).json({ message: "Missing address" });
  }
  if (!!phoneNumber === false) {
    return res.status(400).json({ message: "Missing phoneNumber" });
  }
  const user = new User(body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({ user });
  });
};

const login = (req, res, next) => {
  const { body } = req;
  if (objectHelper.isEmpty(body)) {
    return res.status(400).json({ message: "Missing body" });
  }
  const { email, password } = body;
  if (!!email === false) {
    return res.status(400).json({ message: "Missing email" });
  }
  if (!!password === false) {
    return res.status(400).json({ message: "Missing password" });
  }
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        message: "User with that email does not exist. Please sign up",
      });
    }

    if (!user.authenticate(password)) {
      return res
        .status(401)
        .json({ message: "Email or password don't match!" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("t", token, { expire: new Date() + 9999 });

    const { _id, firstName, lastName, email, role } = user;
    return res
      .status(200)
      .json({ token: token, user: { _id, firstName, lastName, email, role } });
  });
};

const logout = (req, res, next) => {
  res.clearCookie("t");
  res.status(200).json({ message: "Logout success" });
};

const requireLogin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
});

const isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      message: "Access denied",
    });
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      message: "Admin resourse! Access denied",
    });
  } 
  next();

};

module.exports = {
  signUp,
  login,
  logout,
  requireLogin,
  isAuth,
  isAdmin,
};
