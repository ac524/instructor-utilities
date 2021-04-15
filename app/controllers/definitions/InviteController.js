const mail = require("../../mail");

const homeUrl = require("../../config/options")("publicUrl");

const {
	InvalidDataError,
	InvalidUserError,
	NotFoundError
} = require("../../config/errors");

const ioEmit = require("../utils/ioEmit");
const Controller = require("../types/Controller");

/**
 * Type Definition Imports
 * @typedef {import('mongoose').Schema.Types.ObjectId} ObjectId
 *
 * @typedef {import('~crsmmodels/schema/MemberSchema').MemberDocument} MemberDocument
 * @typedef {import('~crsmmodels/schema/RoomSchema').RoomDocument} RoomDocument
 * @typedef {import('~crsmmodels/schema/UserSchema').UserDocument} UserDocument
 * @typedef {import('~crsmmodels/schema/InviteSchema').InviteDocument} InviteDocument
 * @typedef {import('~crsmmodels/schema/TokenSchema').TokenDocument} TokenDocument
 *
 * @typedef {import('~crsm/routes/validation/definitions/inviteValidation').InviteData} InviteData
 * @typedef {import('~crsm/routes/validation/definitions/registerValidation').RegistrationData} RegistrationData
 */

/**
 * Type Definitions
 * 
 * @typedef CreateRoomInviteOptions
 * @property {ObjectId} roomId
 * @property {UserDocument} user
 * @property {InviteData} inviteData
 * 
 * @typedef RemoveRoomInviteOptions
 * @property {ObjectId} roomId
 * @property {ObjectId} inviteId
 * 
 * @typedef GetInviteEmailCheckOptions
 * @property {InviteDocument} invite
 * 
 * @typedef RegisterInviteOptions
 * @property {InviteDocument} invite
 * @property {RegistrationData} registerData
 * 
 * @typedef AcceptInviteOptions
 * @property {TokenDocument} inviteToken
 * @property {RoomDocument} inviteRoom
 * @property {InviteDocument} invite
 * @property {UserDocument} user
 */

class InviteController extends Controller {
	
	constructor() {

		super("invite");
        
	}

	/**
	 * @param {ObjectId} roomId
	 * @param {MemberDocument} member
	 */
	async addStaff(roomId, member) {
		const { staff } = await this.effect("room").updateOne(
			{
				docId: roomId,
				data: { $push: { staff: member } }
			},
			{
				select: "staff",
				populate: "staff.user"
			}
		);

		return staff[staff.length - 1];
	}

	/**
	 * @param {RoomDocument} room
	 * @param {InviteDocument} invite
	 * @param {UserDocument} from
	 */
	sendInvite(room, invite, from) {
		return mail.send(
			"invite",
			{
				name: from.name,
				roomName: room.name,
				inviteLink: `${homeUrl}/invite/${invite.token.tokenString}`
			},
			{
				to: invite.email,
				subject: `You've been invited to Classroom by ${from.name}!`
			}
		);
	}

	/** CONTROLLER METHODS **/

	/**
	 * @param {CreateRoomInviteOptions} param0
	 */
	async create({ roomId, user, inviteData }) {
		const roomEmails = await this.effect("room").findOne(
			{ docId: roomId },
			{
				populate: ["staff.user", "email"],
				select: "invites.email"
			}
		);

		const { email } = inviteData;

		// Check if the email is already registered to a staff member.
		if (roomEmails.staff.map(({ user }) => user.email).includes(email))
			throw new InvalidDataError("Unable to create invite.", {
				email: "This email is already registered to a staff member."
			});

		// Check if the email is already registered to an invite.
		if (
			roomEmails.invites &&
			roomEmails.invites.map(({ email }) => email).includes(email)
		)
			throw new InvalidDataError("Unable to create invite.", {
				email: "This email already has an invite."
			});

		const token = await this.effect("token").createOne({ data: { relation: roomId } });

		const update = {
			$push: {
				invites: {
					email,
					token: token._id
				}
			}
		};

		const room = await this.effect("room").updateOne(
			{
				docId: roomId,
				data: update
			},
			{
				populate: "invites.token"
			}
		);

		const invite = room.invites[room.invites.length - 1];

		if (mail.isEnabled) await sendInvite(room, invite, user);

		return invite;
	}

    /**
     * @param {RemoveRoomInviteOptions} param0
     */
    async remove ({ roomId, inviteId }) {
        const room = await this.effect("room").findOne({ docId: roomId });

        const invite = room.invites.id(inviteId);

        if (!invite) throw new NotFoundError("Invite not found.");

        await this.effect("token").deleteOne({ docId: invite.token });

        invite.remove();

        await room.save();
    }

    /**
     * @param {GetInviteEmailCheckOptions} param0
     */
    async emailCheck ( { invite } ) {
        const { email } = invite;

        const user = await this.effect("user").findOne({ search: { email } });

        return {
            hasUser: Boolean(user),
            email
        };
    }

    /**
     * @param {RegisterInviteOptions} param0
     */
    async register ({ invite, registerData }) {
        const { email } = invite;

        const existingUser = await this.effect("user").findOne({ search: { email } });

        if (existingUser)
            throw new InvalidDataError("Invalid registration.", {
                email: "Email already exists"
            });

        const { name, password } = registerData;

        // Create the User
        await this.effect("user").createOne({
            data: {
                name,
                email,
                password,
                isVerified: true
            }
        });
    }
    
    /**
     * @param {AcceptInviteOptions} param0
     */
    async accept ( { inviteToken, inviteRoom, invite, user } ) {

        const roomId = inviteRoom._id;

        if (user.email !== invite.email)

            throw new InvalidUserError("Please log into the correct account.");

        // Add the staff member to the classroom
        const staff = await this.addStaff(roomId, {
            role: "ta",
            user: user._id
        });

        // Add the room to the user
        await user.update({ $push: { classrooms: roomId } });

        const addStaffDispatch = { type: "ADD_STAFF", payload: staff };
        ioEmit("room:dispatch", addStaffDispatch, `room:${roomId}`);

        await inviteToken.remove();

        invite.remove();

        await inviteRoom.save();

        const deleteInviteDispatch = { type: "DELETE_INVITE", payload: invite._id };
        ioEmit("room:dispatch", deleteInviteDispatch, `room:${roomId}`);

        return { success: true, roomId: roomId };

    }
}


module.exports = InviteController;
