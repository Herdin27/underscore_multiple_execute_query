const winston = require('winston')
const TransportStream = require('winston-transport')
const pool = require('../config/config')

class MyTransport extends TransportStream {

    constructor(option) {
        super(option);
    }

    log(info, next) {
        pool.query(`insert into monitor_log_error values(?, ?, ?, ?)`, [__filename, 'test', info.message, new Date()])
        console.log(`${new Date()} : ${info.level.toUpperCase()} : ${info.message}`);
        next()
    }

}

const logger = winston.createLogger({
    level: "info",
    // handleExceptions: true,
    // handleRejections: true,
    transports: [
        new winston.transports.Console({}),
        new MyTransport({
            level: "warn",
            handleExceptions: true,
            handleRejections: true,
        }),
        new winston.transports.File({
            handleExceptions: true,
            handleRejections: true,
            filename: "exception.log"
        })
    ]
});

module.exports = logger