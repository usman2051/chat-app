const moduleName = "[UserController]"
const {MessageSchema} = require("../../../schema/message");
const logger = require("../../../third-party/logger")(moduleName)
const {queryAdapter} = require("../../../QueryAdapter");
const { sendFailureResponse, sendSuccessResponse } = require("../../../utils/response");

module.exports.sendMessage = async (request, response) => {
    try {
        let {to, text} = request.body
        let {email: from} = request.user
        let sendMsg = {to, from, body: text}

        let msg = await queryAdapter({
            query: {queryType: "insert"},
            model: MessageSchema,
            body: sendMsg
        })

        if(msg.success)
            return sendSuccessResponse(response, 201, '', "Message sent")

        return sendFailureResponse(response, 400, '', "Msg sending failed")
    }

    catch(e) {
        logger.error("[SendMessage]",e.message)
        return sendFailureResponse(response, 500, "Server faced error while processing request", e.message)
    }
}