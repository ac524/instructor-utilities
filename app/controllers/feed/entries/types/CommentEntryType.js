const EntryType = require("./EntryType");

class CommentEntryType extends EntryType {

    getRequestData( req ) {

        return { comment: req.body.comment };

    }

}

module.exports = CommentEntryType;