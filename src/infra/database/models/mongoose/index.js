import fs from "fs";
import path from "path";

const _require = require;

const getModel = (file) => {
  return _require(path.join(__dirname, file)).default;
};
const models = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== path.basename(__filename) && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = getModel(file);
    models[model.modelName] = model;
  });

export default models;
