const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

exports.postSignup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  bcrypt
  .hash(password, 12)
  .then((hashedPassword) => {
    const user = new User({ name, email, password: hashedPassword });
    return user.save();
  })
  .then(savedUser => { 
    res.status(201).json({ userId: savedUser._id })
  })
  .catch(error => { 
      if (!error.statusCode) { 
          error.statusCode = 500
      }
      next(error)
  })
};
