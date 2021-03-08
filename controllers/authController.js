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
            res.json({ token, user });
          }
        });
      } else {
        throw Error("Code is not valid");
      }
    })
    .catch((error) => {
      next(error);
    });
};

exports.postSaveImageAndName = (req, res, next) => {
  
  User.findOne({ _id: req.userId })
    .then((user) => {
      user.name = req.body.name;
      user.image = req.file.path;
      return user.save();
    })
    .then((savedUser) => {
      res.json({ _id: savedUser._id, name: savedUser.name, image: savedUser.image, phone: savedUser.phone });
    })

    .catch((error) => {
      next(error);
    });
};
