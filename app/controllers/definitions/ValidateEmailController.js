const mail = require("../../mail");
const homeUrl = require("../../config/options")( "publicUrl" );

const ioEmit = require("../utils/ioEmit");

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
     * @param {Object} options 
     * @param {import('~crsmmodels/schema/UserSchema').UserDocument} options.createFor
     * 
     * @returns {import('~crsmmodels/schema/TokenSchema').TokenDocument}
     */
    async createOne ({ createFor }) {

        const token =
            await this
                .effect("token")
                .createOne({ data: { relation: createFor._id } });
    
        await mail.send(
          "welcome",
          {
            name: createFor.name,
            verificationLink: `${homeUrl}/validate-email/${token.tokenString}`
          },
          {
            to: createFor.email,
            subject: "Welcome to Classroom! Please verify your email"
          }
        );

        return token;
    
    }

    /**
     * @param {Object} options
     * @param {Object} options.data
     * @param {String} options.data.email
     *
     * @returns {import('~crsmmodels/schema/TokenSchema').TokenDocument}
     */
    async resend ({ data: { email } }) {

        const user = await this.effect('user').findOne({ search: { email } });

        if (!user) throw new NotFoundError("Email not found.");

        return await this.createOne({ createFor: user });

    };

    /**
     * @param {ValidateEmailOptions} param0
     */
    async validate ({ tokenString }) {

        const tokenRecord = await this.effect('token').getByTokenString({ tokenString });

        if (!tokenRecord) throw new NotFoundError("Token not found.");

        const update = { isVerified: true };

        await this.effect('user').updateOne({
            docId: tokenRecord.relation,
            data: update
        });

        ioEmit("user:update", { isVerified: true }, `user:${tokenRecord.relation}`);



    };

}


module.exports = ValidateEmailController;
