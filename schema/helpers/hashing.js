const bcrypt = require("bcrypt");

module.exports.hash = async (value) => bcrypt.hash(value, 10);
module.exports.compare =async(value,hash) => bcrypt.compare(value,hash)
