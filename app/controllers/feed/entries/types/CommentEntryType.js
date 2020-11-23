const { Feed } =  require("../../../../models");
const commentValidation = require("../../../../validation/commentValidation");
const EntryType = require("./EntryType");

class CommentEntryType extends EntryType {

    validation = commentValidation;

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