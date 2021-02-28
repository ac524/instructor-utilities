const { Feed } =  require("../../../models");
const EntryType = require("./EntryType");

class ElevationEntryType extends EntryType {

    async onCreateResHandler( entries, { feedId } ) {

        const feed = await Feed.findById( feedId ).populate("room", "students");
        const student = feed.room.students.id( feed.for );
        
        return [
            entries,
            {
                _id: student._id,
                ...(await student.getFeedAggregateData(["elevation"]))
            }
        ];

    }

}

module.exports = ElevationEntryType;