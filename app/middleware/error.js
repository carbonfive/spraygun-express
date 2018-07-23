const logger = require("@app/logger");

function handleError(err, req, res, _next) {
  const message = err.message;
  const status = err.status || 500;

  if (status === 500) {
    logger.error(err.stack);
  }

  res.status(status);
  res.json({ error: { message, status } });
}

module.exports = handleError;
