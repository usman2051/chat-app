const jwt = require("jsonwebtoken");
const moduleName = "[AuthMiddleware]"
const logger = require("../third-party/logger")(moduleName)
const {sendFailureResponse} = require("../utils/response");
const {queryAdapter} = require('../QueryAdapter')

module.exports.validateToken = (request, response, next) => {
    try {
        let token = request.headers.authorization

        if (!token || !token.includes("Bearer")) {
            logger.error("[ValidateToken]","Auth Token is missing from request")
            return sendFailureResponse(response, 401, {}, "Authentication Token is missing")
        }

        token = token.split(" ")[1]
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY)
        // console.log("KEY", process.env.JWT_SECRET_KEY, "verify", verified)
        if(verified) {
            request.user = {...verified.user}

            if(new Date(verified.exp * 1000) > new Date(Date.now()))
            return next()

            return sendFailureResponse(response, 401, {}, "Token has expired")
        }

         return sendFailureResponse(response, 401, {}, "Token is invalid or missing")
    }

    catch(e) {
        logger.error("[ValidateToken]",e.message)
        return sendFailureResponse(response, 500, "Server faced error while processing request", e.message)
    }
}
