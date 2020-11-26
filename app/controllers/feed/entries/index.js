const { CREATE_FEED_COMMENT, CREATE_FEED_ELEVATE, CREATE_FEED_DEELEVATE } = require("../../../config/permissions");

const {
    CommentEntryType,
    ElevationEntryType
} = require("./types");

module.exports = [
    new CommentEntryType( "comment", { post: CREATE_FEED_COMMENT } ),
    new ElevationEntryType( "elevate", { post: CREATE_FEED_ELEVATE } ),
    new ElevationEntryType( "deelevate", { post: CREATE_FEED_DEELEVATE } )
]