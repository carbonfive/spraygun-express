const express = require("express");
const handleAsync = require("@app/middleware/handle-async");
const auth = require("@app/middleware/authenticate");

const app = express();

app.use(require("helmet")());
app.use(require("@app/middleware/logging"));
app.use(require("@app/middleware/session"));

// Controller routes
app.post("/auth/login", handleAsync(require("@app/controllers/auth").login));
app.post("/auth/logout", handleAsync(require("@app/controllers/auth").logout));
app.get("/api/hello", handleAsync(require("@app/controllers/hello")));
app.get("/api/secret", auth, handleAsync(require("@app/controllers/secret")));

// This must go last
app.use(require("@app/middleware/error"));

module.exports = app;
