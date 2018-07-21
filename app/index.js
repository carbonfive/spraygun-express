const express = require("express");
const handleAsync = require("@app/middleware/handle-async");

const app = express();

app.use(require("helmet")());
app.use(require("@app/middleware/logging"));

// Controller routes
app.get("/api/hello", handleAsync(require("@app/controllers/hello")));

// This must go last
app.use(require("@app/middleware/error"));

module.exports = app;
