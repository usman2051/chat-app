const mongoose = require("mongoose")
const {constants} = require("../config/constants")
const {USER_ROLES} = constants

const Schema = new mongoose.Schema({
    fullName: {type: String, index: true},
    email: {type: String, unique: true},
    password: String,
    /*have to check which one is correct to create an array with enum*/
    // roles: [{type: String, enum: USER_ROLES}],
    // roles: {type: [String], enum: USER_ROLES},
    // status: {type: String, enum: ["enabled", "disabled"], default: "disabled"}
},
{timestamps: true});

module.exports.UserSchema = mongoose.model("user",Schema)