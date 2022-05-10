const moduleName = "[UserController]"
const {MessageSchema} = require("../../../schema/message");
const logger = require("../../../third-party/logger")(moduleName)
const {queryAdapter} = require("../../../QueryAdapter");
const { sendFailureResponse, sendSuccessResponse } = require("../../../utils/response");

module.exports.getInbox = async (request, response) => {
    try {
        let {email: to} = request.user

        let inbox = await queryAdapter({
            query: {queryType: "find", queryOperation: "many"},
            model: MessageSchema,
            filter: {to},
            projection: {from: 1, body: 1}
        })

        if(inbox.result.length > 0){
            inbox = inbox.result
            return sendSuccessResponse(response, 200, inbox, "Inbox fetched successfully")
        }
        return sendSuccessResponse(response, 200, {}, "Your Inbox is empty")
    }

    catch(e) {
        logger.error("[GetInbox]",e.message)
        return sendFailureResponse(response, 500, "Server faced error while processing request", e.message)
    }
}