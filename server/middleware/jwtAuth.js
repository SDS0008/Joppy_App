const jwt = require("jsonwebtoken");
const { model } = require("mongoose");

const jwtAuth = async (req, res, next) => {

    try {

        let jwtToken;
        const authHeader = req.headers["token"];

        if (authHeader !== undefined) {
            jwtToken = authHeader.split(" ")[1]
        }

        if (jwtToken == undefined) {
            return res.status(401).json({ message: "Token not provieded" })
        }
        else {
            jwt.verify(jwtToken, "JOBS_JWT", async (error, payload) => {
                if (error) {
                    return res.status(401).json({ message: "INVALID TOKEN" })
                } else {
                    req.userId = payload.userId
                    next()
                }
            })
        }


    } catch (e) {
        console.log("middleware", e)
        res.status(401).json({ Message: "Auth failed" });
    }


}

module.exports = jwtAuth;