const instanceLibrary = require("../types/library")


/**
 * @param {string} path
 * @returns {Map}
 */
const searchCtrls = ( path ) => new Map( [...instanceLibrary.entries()].filter(([key]) => key.substr( 0, path.length ) === path ) );
    

module.exports = searchCtrls;