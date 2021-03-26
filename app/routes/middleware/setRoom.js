const { NotFoundError } = require("../../config/errors");

const roomCtrl = require("../../controllers/room");
const studentCtrl = require("../../controllers/student");

const setRoom = async (req, next) => {

    try {

        const roomId = req.crdata.get("roomId");
        const classroom = await roomCtrl.findOne( { docId: roomId }, { select: "staff" } );

        if( !classroom ) throw new NotFoundError("Classroom not found");

        req.crdata.set( "room", classroom );

        next();

    } catch(err) {

        next(err);

    }

}

module.exports = {
    async fromBody(req, res, next) {

        req.crdata.set( "roomId", req.body.roomId || req.body.room );

        await setRoom(req, next);

    },
    async fromBody(req, res, next) {

        req.crdata.set( "roomId", req.body.roomId || req.body.room );

        await setRoom(req, next);

    },
    async fromParam(req, res, next) {

        req.crdata.set( "roomId", req.params.roomId );

        await setRoom(req, next);

    },
    async fromFeed(req, res, next) {

        req.crdata.set( "roomId", req.crdata.get("feed").room );

        await setRoom(req, next);

    },
    async fromStudent(req, res, next) {

        try {

            const room = await studentCtrl.findOwner({ docId: req.params.studentId }, { select: "_id" });

            req.crdata.set( "roomId", room._id );

            await setRoom(req, next);

        } catch( err ) {

            next(err);

        }

    }
}