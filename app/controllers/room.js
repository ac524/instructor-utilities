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

const update = async ({ roomId, staffMember, roomData }) => {

    // TODO role authentication should be done in validation middleware.
    if( staffMember.role !== "instructor" ) throw new InvalidUserError( "You must be an instructor to update the class." );

    const updateList = [];

    // TODO - Email updates should not be automatic, instead there needs to be a verification process for the new email.

    ["name"].forEach( key => {
        if( roomData.hasOwnProperty(key) ) updateList.push( [ key, roomData[key] ] );
    });

    if( updateList.length )

        await Classroom.findByIdAndUpdate( roomId, Object.fromEntries( updateList ) );

}

module.exports = {
    getSingle,
    update
}