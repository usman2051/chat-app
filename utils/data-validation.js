const { validationResult } = require("express-validator");
const {sendFailureResponse} = require("../utils/response")

exports.checkValidations = (request, response, next) => {
	const errors = validationResult(request).formatWith(({ msg }) => `${msg}`);
	if (!errors.isEmpty()) {
		console.log("E", errors)
		return sendFailureResponse(response, 422, errors.array(), "Invalid request data")
	}
	next();
}