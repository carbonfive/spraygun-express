require("module-alias/register");

const app = require("@app");
const config = require("@app/config");
const logger = require("@app/logger");

const port = config.express.port;

app.listen(port, () => logger.info(`Listening on port ${port}`));
