var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
app.use(cors());
const http = require("http");
app.use(bodyParser.urlencoded({extended: false}));
require("dotenv").config();
// parse application/json
app.use(bodyParser.json());
// const routes = require("./routes");
require("./config/connection");
const moduleName = "[App]"
global._ = require("lodash");

const server = http.createServer(app)

server.listen(process.env.HTTP_PORT, function() {
    console.log("Server listening on port", process.env.HTTP_PORT)
})

