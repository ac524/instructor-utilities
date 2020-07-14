const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const controllers = [];
const isAuthControllers = [];

const filterFiles = file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');

fs
  .readdirSync(__dirname)
  .filter(filterFiles)
  .forEach(file => {
    controllers.push( require(path.join(__dirname, file)) );
  });

const authRoutesDir = __dirname +  "/isAuth"
fs
  .readdirSync(authRoutesDir)
  .filter(filterFiles)
  .forEach(file => {
    isAuthControllers.push( require(path.join(authRoutesDir, file)) );
  });

module.exports = { controllers, isAuthControllers };