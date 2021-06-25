// Requires that all DELETE/PATCH/POST/PUT requests use application/json.
// This prevents CSRF attacks.
// https://github.com/pillarjs/understanding-csrf#use-only-json-apis

function jsonOnly(req, res, next) {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    return next();
  }

  const contentType = req.headers["content-type"];
  if (contentType && contentType.match(/^application\/json\b/)) {
    return next();
  }
  const error = new Error("Request must be Content-Type: application/json");
  error.status = 400;
  next(error);
}

module.exports = jsonOnly;
