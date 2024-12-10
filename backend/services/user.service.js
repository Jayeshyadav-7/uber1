const User = require("../models/user.model");

module.exports.createUser = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
  if (!firstname || !email || !password) {
    throw Error("All fields are required.");
  }
  const user = User.create({
    name: {
      firstname,
      lastname,
    },
    email,
    password,
  });

  return user;
};
