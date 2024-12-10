const User = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).jason({ errors: errors.array() });
  }

  const { firstname, lastname, email, password } = req.body;
  const hashedPassword = await User.hashedPassword(password);

  const user = await userService.createUser({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();

  res.status(201).jason({ token, user });
};

module.exports.loginUser = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty) {
    return res.status(400).jason({ error: error.array() });
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).jason({ message: "Invalid email or password" });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).jason({ message: "Invalid email or password" });
  }

  const token = user.generateAuthToken();

  res.status(200).jason({ token, user });
};
