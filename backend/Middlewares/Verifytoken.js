const jwt = require('jsonwebtoken')
require('dotenv').config()
function verifyToken(req, res, next) {
    //token verification logic
    //get bearer token from headers of req object
    const bearerToken = req.headers.authorization;
    //get token
    if (bearerToken) {
        const token = bearerToken.split(' ')[1]
        //verify the token
        try {
            let decodedToken = jwt.verify(token, process.env.SECRET_KEY)
            next()
        }
        catch {
            return res.status(403).send({ message: "JWT expired", payload: {} })
        }

        // console.log(decodedToken)
        next()

    }
    else {
        res.send({ message: "Invalid", payload: {} })
    }
}


module.exports = verifyToken;