const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const { Router } = require("express");

const parentRouter = Router();

// Filter function for filtering out unwanted files from fs.readdirSync.
const filterFiles = file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
const getPrefix = file => file[0] === "_" ? "" : "/" + file.substr( 0, file.length-3 );

const routes = Router();

// Read the current director and load found modules into the controllers list.
fs
  .readdirSync(__dirname)
  .filter(filterFiles)
  .forEach(file => {

    routes.use( `/api${getPrefix(file)}`, require(path.join(__dirname, file)) );

  });

// Read the /isAuth sub directory and load found modules into the authRoutesDir.
const authRoutesDir = __dirname +  "/isAuth"
const isAuthenticated = require("./middleware/isAuthenticated");
const isVerified = require("./middleware/isVerified");
const initCrData = require("./middleware/initCrData");

const authRoutes = Router();

fs
  .readdirSync(authRoutesDir)
  .filter(filterFiles)
  .forEach(file => {

    authRoutes.use( `/api${getPrefix(file)}`, isAuthenticated, isVerified, require(path.join(authRoutesDir, file)) );

  });

const catchAllHandler = ( req, res ) => res.sendFile( path.join( __dirname, '../../', 'client/build/index.html' ) );

parentRouter.use(
  initCrData,
  routes,
  authRoutes,
  catchAllHandler
);

module.exports = parentRouter;