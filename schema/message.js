const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    to: String,
    from: String,
    body: String,
},
{timestamps: true});

module.exports.MessageSchema = mongoose.model("Message",Schema)
