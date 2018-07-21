require("@app/env");

exports.express = {
  logFormat: process.env.NODE_ENV === "production" ? "combined" : "dev",
  port: process.env.PORT || 5000
};
