const Controller = require("../types/Controller");

const mail = require("../../mail");

// Load input validation
const sendUserVerifyEmail = require("../utils/sendUserVerifyEmail");

const { InvalidDataError, NotFoundError } = require("../../config/errors");

/**
 * TYPE DEFINITION IMPORTS
 * 
 * @typedef {import('~crsm/routes/validation/definitions/registerValidation').RegistrationData} RegistrationData
 */

/**
 * TYPE DEFINITIONS
 * 
 * @typedef RegisterOptions
 * @property {RegistrationData} registerData
 */

class RegisterController extends Controller {

	constructor() {

		super("register");

	}

	/**
 	 * @param {RegisterOptions} param0
	 */
	async register({ registerData }) {

        let classroom;

		// TODO Code verification and class room association should be moved to middleware so classroom can be passed directily into the controller.
		const { code } = registerData;

		if (code) {
			// Create the User's classroom
			const token = await this.effect("token").getByTokenString({
				tokenString: code
			});

			if (!token)
				throw new NotFoundError("Unknown registration code.", {
					code: "Code not found"
				});

			classroom = await this.effect("room").findOne({
				search: { registerCode: token._id }
			});

			if (!classroom)
				throw new InvalidDataError("Registration code claimed.", {
					code: "Your room is no longer available"
				});
		}

		const { email } = registerData;

		const existingUser = await this.effect("user").findOne({ search: { email } });

		if (existingUser)
			throw new InvalidDataError("Cannot create user.", {
				email: "Email already exists."
			});

		const { name, password } = registerData;

		// Create the User
		const user = await this.effect("user").createOne({
			data: {
				name,
				email,
				password,
				isVerified: !mail.isEnabled
			}
		});

		const { roomname } = registerData;

		if (classroom) {
			classroom.name = roomname;
		} else {
			// Create the User's classroom
			classroom = this.effect("room").createOne(
				{ data: { name: roomname } },
				{ save: false }
			);
		}

		if (classroom.registerCode) {
			await this.effect("token").deleteOne(classroom.registerCode);
			classroom.registerCode = undefined;
		}

		await classroom.save();

		// Add the classroom id to the user
		await user.update({ $push: { classrooms: classroom._id } });

		// Add the staff member to the classroom
		await classroom.update({
			$push: {
				staff: {
					role: "instructor",
					user: user._id
				}
			}
		});

		if (mail.isEnabled) await sendUserVerifyEmail(user);
    }
}

module.exports = RegisterController;
