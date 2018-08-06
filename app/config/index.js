require("./env");

function mandatory(name) {
  const value = process.env[name];
  if (value === undefined) {
    const message = `ERROR: Missing required environment variable: ${name}`;
    throw new Error(message);
  }
  return value;
}

exports.logger = {
  enabled: process.env.NODE_ENV !== "test"
};

exports.express = {
  logFormat: process.env.NODE_ENV === "production" ? "combined" : "dev",
  port: process.env.PORT || 5000,
  verbose404: !["production", "test"].includes(process.env.NODE_ENV)
};

exports.cookie = {
  secure: !process.env.DISABLE_SECURE_COOKIES
};

exports.jwt = {
  cookie: "jwt",
  duration: "1 hour",
  secret: mandatory("JWT_SECRET")
};
