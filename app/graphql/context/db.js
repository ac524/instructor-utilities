const db = require("../../controllers");

/**
 * @typedef DbContext
 * @property {Map} db;
 * 
 * @returns {DbContext}
 */
const loadDb = () => ({ db });

module.exports = loadDb;