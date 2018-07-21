const { createLogger, format, transports } = require("winston");

module.exports = createLogger({
  transports: [new transports.Console({ format: format.simple() })],
  exceptionHandlers: [new transports.Console({ format: format.simple() })]
});
