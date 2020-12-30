const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  const token = req.get("token").split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, JSWT_SECRET);
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
  next()

};
