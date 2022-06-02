const sendSuccessResponse = (response, code = 200, data, message) => {
    console.log("[sendSuccessResponse]",message)
    return response.status(code).json({data: data, msg: message})
}

const sendFailureResponse = (response, code = 400, data, message) => {
    console.log("[sendFailureResponse]",message)
    return response.status(code).json({errors: data, msg: message})
}

module.exports = {
    sendSuccessResponse,
    sendFailureResponse
}


console.log("this is a log")
console.error("this is error")
const errorObject = "some error"

errorObject?console.log("good"):console.error("bad")
