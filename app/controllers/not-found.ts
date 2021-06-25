const config = require("@app/config");

function notFound(req) {
  let message = `No route found for ${req.method} ${req.path}`;
  if (config.express.verbose404) {
    message += ". Refer to app/index.js for a complete list of routes.";
  }
  const error = new Error(message);
  error.status = 404;
  throw error;
}

module.exports = notFound;
