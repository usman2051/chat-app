const {checkValidations} = require("../../../utils/data-validation");
const {body, query, param} = require('express-validator')

module.exports.login = [
    body("email", "Please provide a valid email").isEmail(),
    checkValidations
]

module.exports.register = [
    body("email", "Please provide a valid email").isEmail().toLowerCase(),
    body("userName", "Name must be atleast 3 characters long").isLength(3),
    checkValidations
]
