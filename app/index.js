const express = require("express");
const morgan = require("morgan");
const config = require("@app/config");

const app = express();

app.use(morgan(config.express.logFormat));

app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

module.exports = app;
