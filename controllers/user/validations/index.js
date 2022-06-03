const {checkValidations} = require("../../../utils/data-validation");
const {body, query, param} = require('express-validator')

module.exports.sendMsg = [
    body("to", "Please provide a valid email").isEmail(),
    checkValidations
]

module.exports.searchInbox = [
    body("searchPhrase", "Search phrase must be more than 3 characters").isLength(4),
    checkValidations
]
