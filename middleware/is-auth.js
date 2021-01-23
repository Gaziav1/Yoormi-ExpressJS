const jwt = require("jsonwebtoken")

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
  next()
};
