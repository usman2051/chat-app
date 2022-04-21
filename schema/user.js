const mongoose = require("mongoose")
const {constants} = require("../config/constants")
const {USER_ROLES} = constants

const Schema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    roles: [{type: String, enum: USER_ROLES}],
    status: {type: String, enum: ["enabled", "disabled"], default: "disabled"}
},
{timestamps: true});

module.exports.UserSchema = mongoose.model("user",Schema)