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

const update = async ({ roomId, roomData }) => {

    await Classroom.findByIdAndUpdate( roomId, roomData );

}

module.exports = {
    getSingle,
    update
}