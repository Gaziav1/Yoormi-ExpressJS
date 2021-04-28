const jwt = require("jsonwebtoken")
const User = require("../models/user")

module.exports = (req, res, next) => {
  const tokenHeader = req.get("token");
  if (!tokenHeader) { 
    next()
    return
  }

  const token = tokenHeader.split(" ")[1];
  
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JSWT_SECRET);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw err;
  }
  req.userId = decodedToken.userId
  
  User.findOne({ _id: req.userId })
    .then(user => { 
      req.user = user
      next()
  })
    .catch(error => { 
      next()
      //Maybe change architecture of this method later 
    })
};
