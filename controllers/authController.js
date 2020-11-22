const User = require("../models/user");
const bcrypt = require("bcrypt");
const jsonWebToken = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

exports.postPhoneSignUp = (req, res, next) => {
  client.verify
    .services(process.env.TWILIO_SERVICE_ID)
    .verifications.create({ to: req.body.phone, channel: "sms" })
    .then((verification) => {
      res.json({ phone: verification.to });
    })
    .catch((error) => {
      next(error);
    });
};

exports.postVerifyPhone = (req, res, next) => {
  client.verify
    .services(process.env.TWILIO_SERVICE_ID)
    .verificationChecks.create({ to: req.body.phone, code: req.body.code })
    .then((verificationCheck) => {
      console.log(verificationCheck)
      if (verificationCheck.valid) {
        User.findOne({ phone: req.body.phone }).then((user) => {
          if (!user) {
            const newUser = new User({ phone: req.body.phone });
            return newUser.save().then((user) => {
              const token = jsonWebToken.sign(
                {
                  userPhone: user.phone,
                  userId: user._id,
                },
                process.env.JSWT_SECRET
              );
              res.json({ token, user });
            });
          } else {
            const token = jsonWebToken.sign(
              {
                userPhone: user.phone,
                userId: user._id,
              },
              process.env.JSWT_SECRET
            );
            console.log(token)
            res.json({ token, user });
          }
        });
      }
    })
    .catch((error) => {
      next(error);
    });
};

exports.postSignup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    console.log(errors.array());
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
    .then((savedUser) => {
      res.status(201).json({
        name: savedUser.name,
        email: savedUser.email,
        id: savedUser._id,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.postSignIn = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Login failed");
    error.statusCode = 401;
    error.data = errors.array();
    throw error;
  }
  let loadedUser;
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        const error = new Error("Passwords do not match");
        error.statusCode = 401;
        throw error;
      }
      res.status(200).json({
        token,
        id: loadedUser._id.toString(),
        name: loadedUser.name,
        email: loadedUser.email,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};
