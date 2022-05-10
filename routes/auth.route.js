const express = require("express")
const validator = require("../controllers/auth/validations")
const controller = require("../controllers/auth")

const router = express.Router()

router.post("/register", validator.register, controller.registerUser)
router.post("/login", validator.login, controller.login)

module.exports = router
