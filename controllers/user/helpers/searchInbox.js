//api to search inbox for msgs
const moduleName = "[UserController]"
const {MessageSchema} = require("../../../schema/message");
const logger = require("../../../third-party/logger")(moduleName)
const {queryAdapter} = require("../../../QueryAdapter");
const { sendFailureResponse, sendSuccessResponse } = require("../../../utils/response");

exports.searchInbox = async (request, response) => {
    try {
        const {email: to} = request.user
        const {searchPhrase} = request.body
        console.log("LOCO", to, searchPhrase)

        let inbox = await queryAdapter({
            query:{queryType: "find", queryOperation: "many"},
            filter: {to},
            model: MessageSchema,
            projection: {from: 1, body: 1, createdAt: 1, _id: 0}
        })

        if(inbox.success && inbox.result) {
            inbox = inbox.result
            console.log("ESTE", inbox)

            let matchedMsgs = inbox.filter(o => o.body.includes(searchPhrase))
            console.log("YAHOUL", matchedMsgs)
            return sendSuccessResponse(response, 200, matchedMsgs, "Operation successful")
        }
        return sendFailureResponse(response, 400, {}, "Failed to fetch results")
    }
    
    catch(e) {
        logger.error("[SearchInbox]",e.message)
        return sendFailureResponse(response, 500, "Server faced error while processing request", e.message)
    }
}
