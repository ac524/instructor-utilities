const { Classroom, Feed } = require("../../models");
const { NotFoundError } = require("../../config/errors");

const setClassroom = async (req, next) => {

    try {

        const roomId = req.crdata.get("roomId");
        const classroom = await Classroom.findById( roomId ).select("staff");

        if( !classroom ) throw new NotFoundError("Classroom not found");

        req.crdata.set( "classroom", classroom );

        next();

    } catch(err) {

        next(err);

    }

}

module.exports = {
    async fromBody(req, res, next) {

        req.crdata.set( "roomId", req.body.roomId );

        await setClassroom(req, next);

    },
    async fromParam(req, res, next) {

        req.crdata.set( "roomId", req.params.roomId );

        await setClassroom(req, next);

    },
    async fromFeed(req, res, next) {

        try {

            const feed = await Feed.findById( req.params.feedId ).select( "room" );

            if( !feed ) throw new NotFoundError( "Target feed not found." );

            req.crdata.set( "roomId", feed.room );

        } catch( err ) {
            
            next(err);

        }

        await setClassroom(req, next);

    }
}