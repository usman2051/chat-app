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
const routes = require("./routes")
const moduleName = "[App]"
global._ = require("lodash");
const logger = require("./third-party/logger")(moduleName)
const swaggerUi = require("swagger-ui-express"),
    swaggerDocument = require("./swagger.json")
    
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use("/chat", routes)

const server = http.createServer(app)

server.listen(process.env.HTTP_PORT, function() {
    console.log("Server listening on port", process.env.HTTP_PORT)
})

