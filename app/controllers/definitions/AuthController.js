const util = require("util");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../../config/options")( "secret" );

const { InvalidDataError } = require("../../config/errors");

const Controller = require("../types/Controller");

const jwtSign = util.promisify( jwt.sign );

/**
 * Type Definition Imports
 * @typedef {import('~crsmmodels/schema/UserSchema').UserDocument} UserDocument
 * @typedef {import('~crsm/routes/validation/definitions/loginValidation').LoginData} LoginData
 */

/**
 * Type Definitions
 * @typedef GetAuthUserOptions
 * @property {UserDocument} user
 * 
 * @typedef LoginOptions
 * @property {LoginData} credentials
 */

class AuthController extends Controller {

    constructor() {

        super("auth");

    }

    /** 
     * @param {GetAuthUserOptions} param0 
     * @returns {UserDocument}
     */
    authenticated({ user }) {

        return user;

    }

    /**
     * 
     * @param {LoginOptions} param0
     * @returns {object}
     */
    async login({ credentials }) {

        const { email, password } = credentials;

        // Find user by email
        const user =  await this.effect("user").findOne({ search: { email } });

        if (!user)

            throw new InvalidDataError( "Email or password is invalid." );

        const isMatch = await bcrypt.compare( password, user.password );

        if( !isMatch )

            throw new InvalidDataError( "Email or password is invalid." );

        // User matched
        // Create JWT Payload
        const payload = {
            id: user.id,
            name: user.name
        };

        const token = await jwtSign(
            payload,
            secret,
            {
                expiresIn: 31556926 // 1 year in seconds
            }
        );

        return {
            success: true,
            token: "Bearer " + token,
            user
        }

    }

}

module.exports = AuthController;