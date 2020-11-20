const { InvalidUserError } = require("../config/errors");
const { Classroom } = require("../models");

/** CONTROLLER METHODS **/

const getSingle = async ({ roomId }) => {

        const room =
            await Classroom.findById( roomId )
                .populate("staff.user", "name email date")
                .populate("invites.token");

        return await room.getFeedAggregate();

}

const update = async ({ roomId, roomStaffMember, body }) => {

    if( roomStaffMember.role !== "instructor" ) throw new InvalidUserError( "You must be an instructor to update the class." );

    const updateList = [];

    // TODO - Email updates should not be automatic, instead there needs to be a verification process for the new email.

    ["name"].forEach( key => {
        if( body.hasOwnProperty(key) ) updateList.push( [ key, body[key] ] );
    });

    if( updateList.length )

        await Classroom.findByIdAndUpdate( roomId, Object.fromEntries( updateList ) );

}

module.exports = {
    getSingle,
    update
}