const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    to: String,
    from: String,
    body: String,
},
{timestamps: true});

Schema.index({to: 1, from: 1})

module.exports.MessageSchema = mongoose.model("Message",Schema)
