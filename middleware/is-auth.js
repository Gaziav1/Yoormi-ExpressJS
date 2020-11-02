import jwt from "jsonwebtoken";

module.exports = (req, res, next) => { 
    const token = req.get("Authorization").split(' ')[1] 
    let decodedToken
    try {
        decodedToken = jwt.verify(token, JSWT_SECRET)
    } catch (err) { 
        err.statusCode = 500
        next(err)
    }
}