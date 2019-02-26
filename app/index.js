const express = require("express");
const handleAsync = require("@app/middleware/handle-async");
const session = require("@app/middleware/jwt-session");
const auth = session.authenticate;

const app = express();

app.use(require("helmet")());
app.use(require("@app/middleware/logging"));
app.use(require("@app/middleware/basic-auth"));

app.use("/api/", require("cookie-parser")());
app.use("/api/", require("@app/middleware/json-only"));
app.use("/api/", require("body-parser").json());
app.use("/api/", session.middleware);

// Controller routes
app.post("/api/login", handleAsync(require("@app/controllers/auth").login));
app.post("/api/logout", handleAsync(require("@app/controllers/auth").logout));
app.get("/api/hello", handleAsync(require("@app/controllers/hello")));
app.get("/api/secret", auth, handleAsync(require("@app/controllers/secret")));

// These must go last
app.use(handleAsync(require("@app/controllers/not-found")));
app.use(require("@app/middleware/error"));

module.exports = app;
