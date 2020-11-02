const {
    CommentEntryType,
    ElevationEntryType
} = require("./types");

module.exports = [
    new CommentEntryType( "comment" ),
    new ElevationEntryType( "elevate" ),
    new ElevationEntryType( "deelevate" )
]