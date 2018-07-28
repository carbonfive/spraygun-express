require("./env");
const path = require("path");

function mandatory(name) {
  const value = process.env[name];
  if (value === undefined) {
    const message = `ERROR: Missing required environment variable: ${name}`;
    throw new Error(message);
  }
  return value;
}

const isProd = process.env.NODE_ENV === "production";
const isTest = process.env.NODE_ENV === "test";

exports.logger = {
  enabled: !isTest
};

exports.express = {
  logFormat: isProd ? "combined" : "dev",
  port: process.env.PORT || 5000,
  staticRoot: isProd ? path.join(__dirname, "../../client/build") : null,
  verbose404: !(isProd || isTest)
};

exports.cookie = {
  secure: !process.env.DISABLE_SECURE_COOKIES
};

exports.jwt = {
  cookie: "jwt",
  duration: "1 hour",
  secret: mandatory("JWT_SECRET")
};
