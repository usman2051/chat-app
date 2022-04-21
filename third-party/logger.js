const {transports, format, createLogger, addColors} = require("winston");
const {combine, timestamp, printf, colorize, prettyPrint} = format;

const levels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        debug: 3,
    },
    colors: {
        error: "red",
        warn: "yellow",
        info: "white",
        debug: "blue"
    }
};

const customFormat = combine(
    timestamp(
        {format: "DD-MM-YYYY HH:mm:ss.SSS"}
    ),
    colorize({all: true}),
    prettyPrint(),
    printf(info => `${info.timestamp} |${info.level}|  ${info.message}`)
);
const logger = createLogger({
    levels: levels.levels,
    format: customFormat,
    transports: [
        new transports.Console({level: process.env.LOG_LEVEL || "error"})
    ]
});

addColors(levels.colors);
module.exports = (moduleName) => {
    return {
        debug: function (message, data) {
            message = `${moduleName} ${message}`;
            logger.debug(message + (data ? " " + JSON.stringify(data) : ""));
        },
        info: (message, data) => {
            message = `${moduleName} ${message}`;
            logger.info(message + (data ? " " + JSON.stringify(data) : ""));
        },
        warn: function (message, data) {
            message = `${moduleName} ${message}`;
            logger.warn(message + (data ? " " + JSON.stringify(data) : ""));
        },
        error: function (message, data) {
            message = `${moduleName} ${message}`;
            logger.error(message + (data ? " " + JSON.stringify(data) : ""));
        }
    };
};
