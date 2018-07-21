const logger = require("@app/logger");

function handleError(err, req, res, _next) {
  logger.error(err.stack);

  const message = err.message;
  const status = err.status || 500;

  res.status(status);
  res.json({ error: { message, status } });
}

module.exports = handleError;
