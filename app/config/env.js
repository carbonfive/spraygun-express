// Extracted from create-react-app
// https://github.com/facebook/create-react-app/blob/26f701fd60cece427d0e6c5a0ae98a5c79993640/packages/react-scripts/config/env.js

const path = require("path");
const dotenv = require("dotenv");
const DOTENV_PATH = path.resolve(__dirname, "../..", ".env");
const NODE_ENV = process.env.NODE_ENV || "development";

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const dotenvFiles = [
  `${DOTENV_PATH}.${NODE_ENV}.local`,
  `${DOTENV_PATH}.${NODE_ENV}`,
  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  NODE_ENV !== "test" && `${DOTENV_PATH}.local`,
  DOTENV_PATH,
].filter(Boolean);

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
dotenvFiles.forEach((dotenvFile) => {
  dotenv.config({ path: dotenvFile });
});
