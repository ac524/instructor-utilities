const { Feed } =  require("../../../../models");
const { comment: commentVal } = require("../../../../validation");
const EntryType = require("./EntryType");

class CommentEntryType extends EntryType {

    validation = commentVal;

    async onCreateResHandler( entries, { feedId } ) {

        const feed = await Feed.findById( feedId ).populate("room", "students");
        const student = feed.room.students.id( feed.for );
        
        return [
            entries,
            {
                _id: student._id,
                ...(await student.getFeedAggregateData(["recentComments"]))
            }
        ];

    }

}

module.exports = CommentEntryType;