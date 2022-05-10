const moduleName = "[AuthController]"
const {UserSchema} = require("../../../schema/user");
const {sendFailureResponse, sendSuccessResponse} = require("../../../utils/response")
const logger = require("../../../third-party/logger")(moduleName)
const {queryAdapter} = require("../../../QueryAdapter")
const {hash} = require("../../../schema/helpers/hashing")

module.exports.registerUser = async (request, response) => {
    try {
        let {userName, email, pass} = request.body
       

        const existingUser = await queryAdapter({
            query: {queryType: "find"},
            model: UserSchema,
            filter: {email}
        })

        if(existingUser.result)
            return sendFailureResponse(response, 409, "conflicting request", "user already exists in DB")

        pass = await hash(pass)
        
        let userInfo = {fullName: userName, email: email, password: pass}

        let user = await queryAdapter({
            query: {queryType: "insert"},
            model: UserSchema,
            body: userInfo
        })

        if(!user.success)
            return sendFailureResponse(response, 400, "Bad request", "Couldn't insert record in DB")
        
        user = user.result

        return sendSuccessResponse(response, 201, user, "User created successfully" )

    }
    catch(e) {
        logger.error("[RegisterUser]",e.message)
        return sendFailureResponse(response, 500, "Server faced error while processing request", e.message)
    }
}