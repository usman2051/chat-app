const fs = require("fs")
const path = require("path")

let files = fs.readdirSync(path.join(__dirname, "helpers"))

for (let file of files) {
    let functions = require(path.join(__dirname, "helpers", file))
    
    for (const fun of Object.keys(functions)) {
        
        module.exports[fun] = functions[fun]
    }
}
