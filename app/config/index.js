require("./env");

exports.logger = {
  enabled: process.env.NODE_ENV !== "test"
};

exports.express = {
  logFormat: process.env.NODE_ENV === "production" ? "combined" : "dev",
  port: process.env.PORT || 5000
};
