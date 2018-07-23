const sessions = require("client-sessions");
const config = require("@app/config");

const session = sessions({
  cookieName: "session",
  secret: config.session.secret,
  duration: 60 * 60 * 1000, // 1 hour
  activeDuration: 30 * 60 * 1000, // 30 minutes
  cookie: {
    ephemeral: true,
    httpOnly: true
  }
});

module.exports = session;
