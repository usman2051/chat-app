const express = require("express")
const validator = require("../controllers/user/validations")
const controller = require("../controllers/user")
const {validateToken} = require("../middleware/authentication")

const router = express.Router()

router.get("/inbox", validateToken, controller.getInbox)
router.post("/send-msg", validateToken, validator.sendMsg, controller.sendMessage)
router.patch("/update/:id",)

module.exports = router
