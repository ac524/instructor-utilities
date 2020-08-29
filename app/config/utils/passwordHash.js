const bcrypt = require("bcryptjs");
const util = require('util');

const genSalt = util.promisify( bcrypt.genSalt );
const hash = util.promisify( bcrypt.hash );

module.exports = async ( raw ) => {

    const salt = await genSalt( 10 );

    return hash( raw, salt );

}