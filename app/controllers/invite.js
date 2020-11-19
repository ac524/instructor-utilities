const crypto = require('crypto');
const mail = require('../config/utils/mail');

const { Token, Classroom, User } = require("../models");

const validateRegisterInput = require("../config/validation/register");
const passwordHash = require("../config/utils/passwordHash");
const ioEmit = require("./utils/ioEmit");
const { RouteError } = require('../config/errors/RouteError');
const homeUrl = require("../config/options")( "publicUrl" );

/** HELPER METHODS **/

const addStaff = async (roomId, member) => {

    const { staff } =
        await Classroom
            .findByIdAndUpdate(roomId, { $push: { staff: member } }, {new:true})
            .select("staff")
            .populate("staff.user");

    return staff[ staff.length - 1 ];

}

const sendInvite = ( room, invite, from ) => {

    return mail.send(
        "invite",
        {
            name: from.name,
            roomName: room.name,
            inviteLink: `${homeUrl}/invite/${invite.token.token}`
        },
        {
            to: invite.email,
            subject: `You've been invited to Classroom by ${from.name}!`
        }
    );

}

/** CONTROLLER METHODS **/

const create = async ({ roomId, user, body })  => {

    const roomEmails = await Classroom.findById(roomId).populate('staff.user',"email").select("invites.email");

    const { email } = body;

    // Check if the email is already registered to a staff member.
    if( roomEmails.staff.map( ({user}) => user.email ).includes( email ) )

        throw new RouteError( 400, "Unable to create invite.", { email: "This email is already registered to a staff member." } );

    // Check if the email is already registered to an invite.
    if( roomEmails.invites && roomEmails.invites.map( ({email}) => email ).includes( email ) )

        throw new RouteError( 400, "Unable to create invite.", { email: "This email already has an invite." } );

    const token = new Token({
        relation: roomId,
        token: crypto.randomBytes(16).toString('hex')
    });

    await token.save();

    const update = {
        $push: {
            invites: {
                email,
                token: token._id
            }
        }
    };

    const room =
        await Classroom
            .findByIdAndUpdate( roomId, update, { new: true } )
            .populate( 'invites.token' );

    const invite = room.invites[ room.invites.length - 1 ];

    if( mail.isEnabled ) await sendInvite( room, invite, user );

    return invite;

}


/**
 * Delete an invite
 */
const remove = async ({ roomId, inviteId }) => {

    const room = await Classroom.findById( roomId );

    const invite = room.invites.id( inviteId );

    if( !invite ) throw new RouteError( 404, "Invite not found." );

    await Token.findByIdAndDelete( invite.token );

    invite.remove();

    await room.save();

}

/**
 * Checks if an invite's email has a user.
 */
const emailCheck = async ({ userInvite }) => {

    const { email } = userInvite;
    const user = await User.findOne({ email });

    return {
        hasUser: Boolean( user ),
        email
    };

}

/**
 * Register a User through an invite.
 */
const register = async ({ userInvite, body }) => {

    const { errors, isValid } = validateRegisterInput(body, ["email","roomname","code"]);

    // Check validation
    if (!isValid)

        throw new RouteError( 400, "Invalid registration.", errors );

    const { email } = userInvite;

    const existingUser = await User.findOne({ email });

    if( existingUser )

        throw new RouteError( 400, "Invalid registration.", { email: "Email already exists" } );

    // Create the User
    const user = new User({
        name: body.name,
        email,
        password: await passwordHash( body.password ),
        isVerified: true
    });

    await user.save();

}

/**
 * Accept the invitation to join a room.
 */
const accept = async ({ userInviteRoom, userInviteToken, userInvite, user }) => {

    const roomId = userInviteRoom._id;

    if( user.email !== userInvite.email )

        throw new RouteError( 401, "Please log into the correct account." );

    // Add the staff member to the classroom
    const staff = await addStaff( roomId, {
        role: "ta",
        user: user._id
    } );

    // Add the room to the user
    await user.update({ $push: { classrooms: roomId } });

    const addStaffDispatch = { type: "ADD_STAFF", payload: staff };
    ioEmit( "dispatch", addStaffDispatch, `room:${roomId}` );

    await userInviteToken.remove();

    userInvite.remove();

    await userInviteRoom.save();

    const deleteInviteDispatch = { type: "DELETE_INVITE", payload: userInvite._id };
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