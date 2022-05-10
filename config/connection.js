const mongoose = require("mongoose")
const moduleName = "[MongoConnection]"
const logger = require("../third-party/logger")(moduleName)

const dbURI = process.env.MONGO_URL

const connectWithRetry = () => {
    return mongoose.connect(dbURI, (err) => {
        if (err) {
            logger.error("[.mongoose.connect Failed to connect] [ERROR]", err)
        }
    });
};

connectWithRetry();

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch((error) => logger.error("[Mongoose Connection Issue] [ERROR]", error))

// Connectivity status on connection establishment
mongoose.connection.on("connected", () =>
    console.log("info", "Mongoose connection:", "Connection Established")
);

// Connectivity status on connection resetting
mongoose.connection.on("reconnected", () =>
    console.log("info", "Mongoose connection:", "Connection Reestablished")
);

// Connectivity status on disconnection
mongoose.connection.on("disconnected", () => {
        console.log("info", "Mongoose connection:", "Connection Disconnected")
        setTimeout(connectWithRetry, 5000)
    }
);

// Connectivity Status  On connection close
mongoose.connection.on("close", () =>
    console.log("info", "Mongoose connection Issue:", "Connection Closed")
);

// Connectivity Status  On error
mongoose.connection.on("error", (error) =>
    console.log("error", "Mongoose connection Issue:", error)
);

module.exports = mongoose;
