const {checkValidations} = require("../../../utils/data-validation");
const {body, query, param} = require('express-validator')

module.exports.sendMsg = [
    body("to", "Please provide a valid email").isEmail(),
    checkValidations
]
