const morgan = require("morgan");
const config = require("@app/config");
const logger = require("@app/logger");

const logging = morgan(config.express.logFormat, {
  stream: { write: message => logger.info(message.trim()) }
});

module.exports = logging;
