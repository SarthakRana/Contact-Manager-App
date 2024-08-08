const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                // means token is not valid - so user is unauthorized
                res.status(401);
                throw new Error("User is not authorized!");
            }
            // console.log(decoded);   // prints the payload of jwt token
            req.user = decoded.user;    // attach payload (decoded) - user info - to request
            next();
        });
        if (!token) {
            res.status(401);
            throw new Error("User is not authorized or token is missing!");
        }
    }
})

module.exports = validateToken;