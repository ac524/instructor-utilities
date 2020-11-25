const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const { Router } = require("express");

const initCrData = require("./middleware/initCrData");

const parentRouter = Router();

// Filter function for filtering out unwanted files from fs.readdirSync.
const filterFiles = file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
const getPrefix = file => file[0] === "_" ? "" : "/" + file.substr(0, file.length-3).replace(/[A-Z]/g, upper => `-${upper.toLowerCase()}`);

const routes = Router();

// Read the current director and load found modules into the controllers list.
fs
  .readdirSync(__dirname)
  .filter(filterFiles)
  .forEach(file => {

    routes.use( `/api${getPrefix(file)}`, require(path.join(__dirname, file)) );

  });
  
const catchAllHandler = ( req, res ) => res.sendFile( path.join( __dirname, '../../', 'client/build/index.html' ) );

parentRouter.use(
  initCrData,
  routes,
  catchAllHandler
);

module.exports = parentRouter;