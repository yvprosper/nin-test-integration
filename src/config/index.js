/* eslint-disable import/first */
import dotEnvExtended from "dotenv-extended";
import fs from "fs";
import path from "path";

// load environmental variable
dotEnvExtended.load({
  encoding: "utf8",
  silent: false,
  path: ".env",
  defaults: ".defaults.env",
  schema: ".schema.env",
  errorOnMissing: true,
  errorOnExtra: false,
  errorOnRegex: false,
  includeProcessEnv: false,
  assignToProcessEnv: true,
  overrideProcessEnv: false,
});
import convict from "convict";

const _require = require;
let configCombine = {};
const getConfig = (file) => {
  return _require(path.join(__dirname, file));
};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== path.basename(__filename) && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const config = getConfig(file);
    configCombine = Object.assign(configCombine, config);
  });

const config = convict(configCombine);

// Perform validation
config.validate({ allowed: "strict" });

module.exports = config;
