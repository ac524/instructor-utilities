require("dotenv").config();

require("~crsm/config/mongoose");

/**
 * Simple migration for single purpose currently needed
 **/
const Room = require("~crsmmodels/Room");

const aggregateAllRooms = async () => {

    try {

        const rooms = await Room.find();
    
        for( room of rooms ) await aggregateRoom( room );

    } catch(err) {

        console.log(err);

    }


    process.exit(0);

}

const aggregateRoom = async room => {

    for( student of room.students ) {

        student._doc = {
            ...student._doc,
            ...await( student.getFeedAggregateData() )
        }

    }

    await room.save();

}

aggregateAllRooms();