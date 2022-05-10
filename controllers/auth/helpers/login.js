const moduleName = "[AuthController]"
const jwt = require('jsonwebtoken')
const {UserSchema} = require("../../../schema/user");
const logger = require("../../../third-party/logger")(moduleName)
const {queryAdapter} = require("../../../QueryAdapter");
const {compare} = require("../../../schema/helpers/hashing")
const { sendFailureResponse, sendSuccessResponse } = require("../../../utils/response");

module.exports.login = async (request, response) => {
    try {
        const {email, pass} = request.body

        let user = await queryAdapter({
            query: {queryType: "find"},
            model: UserSchema,
            filter: {email}
        })

        if(!user.result)
            return sendFailureResponse(response, 401, "Invalid email provided", "email not in DB")
        
        user = user.result

        const checkPass = await compare(pass, user.password)

        if(checkPass) {
            let payload = {
                user: {
                    user_id: user._id,
                    name: user.fullName,
                    email: user.email,
                }
            }

            let token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRY })
            // token = `bearer'${token}'`

            return sendSuccessResponse(response, 200, token, "Login successful")
        }

        return sendFailureResponse(response, 401, {}, "Provided credentials do not match" )
    }
    catch(e) {
        logger.error("[Login]",e.message)
        return sendFailureResponse(response, 500, "server faced error while processing request", e.message)
    }
}
