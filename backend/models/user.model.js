const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    firstame: {
      type: String,
      required: true,
      minlength: [3, "First name must be atleast three characters long"],
    },
    lastname: {
      type: String,
      minlength: [3, "First name must be atleast three characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "email must be minmum 5 char ling"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  sockedId: {
    type: String,
  },
});

userSchema.method.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.static.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
