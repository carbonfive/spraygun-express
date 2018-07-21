const { createLogger, format, transports } = require("winston");
const config = require("@app/config");

const logger = createLogger({
  transports: [
    new transports.Console({
      format: format.simple(),
      silent: !config.logger.enabled
    })
  ],
  exceptionHandlers: [new transports.Console({ format: format.simple() })]
});

module.exports = logger;
