const mail = require('../mail');

const homeUrl = require("../config/options")( "publicUrl" );
const { InvalidDataError, InvalidUserError, NotFoundError } = require('../config/errors');

const { Room } = require("../models");
const tokenCtrl = require("./token");
const userCtrl = require('./user');

const ioEmit = require("./utils/ioEmit");

/**
 * Type Definition Imports
 * @typedef {import('mongoose').Schema.Types.ObjectId} ObjectId
 * 
 * @typedef {import('../models/schema/MemberSchema').MemberDocument} MemberDocument
 * @typedef {import('../models/schema/RoomSchema').RoomDocument} RoomDocument
 * @typedef {import('../models/schema/UserSchema').UserDocument} UserDocument
 * @typedef {import('../models/schema/InviteSchema').InviteDocument} InviteDocument
 * @typedef {import('../models/schema/TokenSchema').TokenDocument} TokenDocument
 * 
 * @typedef {import('../config/validation/definitions/inviteValidation').InviteData} InviteData
 * @typedef {import('../config/validation/definitions/registerValidation').RegistrationData} RegistrationData
 */

/** HELPER METHODS **/

/**
 * @param {ObjectId} roomId 
 * @param {MemberDocument} member 
 */
const addStaff = async (roomId, member) => {

    const { staff } =
        await Room
            .findByIdAndUpdate(roomId, { $push: { staff: member } }, {new:true})
            .select("staff")
            .populate("staff.user");

    return staff[ staff.length - 1 ];

}

/**
 * @param {RoomDocument} room 
 * @param {InviteDocument} invite 
 * @param {UserDocument} from 
 */
const sendInvite = ( room, invite, from ) => {

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
 * @typedef CreateRoomInviteOptions
 * @property {ObjectId} roomId
 * @property {UserDocument} user
 * @property {InviteData} inviteData
 * 
 * @param {CreateRoomInviteOptions} param0 
 */
const create = async ({ roomId, user, inviteData })  => {

    const roomEmails = await Room.findById(roomId).populate('staff.user',"email").select("invites.email");

    const { email } = inviteData;

    // Check if the email is already registered to a staff member.
    if( roomEmails.staff.map( ({user}) => user.email ).includes( email ) )

        throw new InvalidDataError( "Unable to create invite.", { email: "This email is already registered to a staff member." } );

    // Check if the email is already registered to an invite.
    if( roomEmails.invites && roomEmails.invites.map( ({email}) => email ).includes( email ) )

        throw new InvalidDataError( "Unable to create invite.", { email: "This email already has an invite." } );

    const token = await tokenCtrl.createOne( { data: { relation: roomId } } );

    const update = {
        $push: {
            invites: {
                email,
                token: token._id
            }
        }
    };

    const room =
        await Room
            .findByIdAndUpdate( roomId, update, { new: true } )
            .populate( 'invites.token' );

    const invite = room.invites[ room.invites.length - 1 ];

    if( mail.isEnabled ) await sendInvite( room, invite, user );

    return invite;

}

/**
 * @typedef RemoveRoomInviteOptions
 * @property {ObjectId} roomId
 * @property {ObjectId} inviteId
 * 
 * @param {RemoveRoomInviteOptions} param0 
 */
const remove = async ({ roomId, inviteId }) => {

    const room = await Room.findById( roomId );

    const invite = room.invites.id( inviteId );

    if( !invite ) throw new NotFoundError( "Invite not found." );

    await tokenCtrl.deleteOne( { docId: invite.token } );

    invite.remove();

    await room.save();

}

/**
 * @typedef GetInviteEmailCheckOptions
 * @property {InviteDocument} invite
 * 
 * @param {GetInviteEmailCheckOptions} param0 
 */
const emailCheck = async ({ invite }) => {

    const { email } = invite;

    const user = await userCtrl.findOne({ search: { email } });

    return {
        hasUser: Boolean( user ),
        email
    };

}

/**
 * @typedef RegisterInviteOptions
 * @property {InviteDocument} invite
 * @property {RegistrationData} registerData
 * 
 * @param {RegisterInviteOptions} param0 
 */
const register = async ({ invite, registerData }) => {

    const { email } = invite;

    const existingUser = await userCtrl.findOne({ search: { email } });

    if( existingUser )

        throw new InvalidDataError( "Invalid registration.", { email: "Email already exists" } );

    const { name, password } = registerData;

    // Create the User
    await userCtrl.createOne({ data: {
        name,
        email,
        password,
        isVerified: true
    } });

}

/**
 * @typedef AcceptInviteOptions
 * @property {TokenDocument} inviteToken
 * @property {RoomDocument} inviteRoom
 * @property {InviteDocument} invite
 * @property {UserDocument} user
 * 
 * @param {AcceptInviteOptions} param0 
 */
const accept = async ({ inviteToken, inviteRoom, invite, user }) => {

    const roomId = inviteRoom._id;

    if( user.email !== invite.email )

        throw new InvalidUserError( "Please log into the correct account." );

    // Add the staff member to the classroom
    const staff = await addStaff( roomId, {
        role: "ta",
        user: user._id
    } );

    // Add the room to the user
    await user.update({ $push: { classrooms: roomId } });

    const addStaffDispatch = { type: "ADD_STAFF", payload: staff };
    ioEmit( "dispatch", addStaffDispatch, `room:${roomId}` );

    await inviteToken.remove();

    invite.remove();

    await inviteRoom.save();

    const deleteInviteDispatch = { type: "DELETE_INVITE", payload: invite._id };
    ioEmit( "dispatch", deleteInviteDispatch, `room:${roomId}` );

    return { success: true, roomId: roomId };

}

module.exports = {
    create,
    remove,
    emailCheck,
    register,
    accept
}