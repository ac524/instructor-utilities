const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const controllers = [];
const isAuthControllers = [];

// Filter function for filtering out unwanted files from fs.readdirSync.
const filterFiles = file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');

// Read the current director and load found modules into the controllers list.
fs
  .readdirSync(__dirname)
  .filter(filterFiles)
  .forEach(file => {
    controllers.push( require(path.join(__dirname, file)) );
  });

// Read the /isAuth sub directory and load found modules into the authRoutesDir.
// const authRoutesDir = __dirname +  "/isAuth"
// fs
//   .readdirSync(authRoutesDir)
//   .filter(filterFiles)
//   .forEach(file => {
//     isAuthControllers.push( require(path.join(authRoutesDir, file)) );
//   });

module.exports = { controllers, isAuthControllers };