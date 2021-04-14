/** @format */

const sendUserVerifyEmail = require("../utils/sendUserVerifyEmail");
const ioEmit = require("../utils/ioEmit");

const tokenCtrl = require("../token");
const userCtrl = require("../user");

const { NotFoundError } = require("../../config/errors");
const Controller = require("../types/Controller");
/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('~crsm/routes/validation/definitions/resendValidation').ResendData} ResendData
 */

/**
 * Type Definitions
 * 
 * @typedef {Object} ResendValidateEmailOptions
 * @property {ResendData} config
 * 
 * @typedef {Object} ValidateEmailOptions
 * @property {string} token
 */

class ValidateEmailController extends Controller {

	constructor() {

		super("validate.email");

	}

    /**
     * @param {ResendValidateEmailOptions} param0
     */
    async resend ({ config }) {
        const { email } = config;

        const user = await userCtrl.findOne({ search: { email } });

        if (!user) throw new NotFoundError("Email not found.");

        await sendUserVerifyEmail(user);
    };

    /**
     * @param {ValidateEmailOptions} param0
     */
    async validate ({ tokenString }) {
        const tokenRecord = await tokenCtrl.getByTokenString({ tokenString });

        if (!tokenRecord) throw new NotFoundError("Token not found.");

        const update = { isVerified: true };

        await userCtrl.updateOne({
            docId: tokenRecord.relation,
            data: update
        });

        ioEmit("user:update", { isVerified: true }, `user:${tokenRecord.relation}`);
    };
}


module.exports = ValidateEmailController;
