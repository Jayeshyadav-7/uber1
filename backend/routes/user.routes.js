const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const app = require("../app");

router.post("/register", [
  body("email").isEmail().withMessage("invalidEmail"),
  body("fullname.firstname")
    .isLength({ min: 3 })
    .withMessage("First name must be atleast three characters long."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast six characters long."),
]);

module.exports = router;
