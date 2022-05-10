const express = require("express")
const authRoutes = require("./auth.route")
const userRoutes = require("./user.route")

let router = express.Router()
let totalRoutes = [authRoutes, userRoutes]

totalRoutes.forEach((route) => {
    router.use(route)
})

module.exports = router
