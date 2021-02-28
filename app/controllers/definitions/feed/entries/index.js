const perms = require("~crsm/config/permissions");

const {
    CommentEntryType,
    ElevationEntryType
} = require("./types");

module.exports = [
    new CommentEntryType( "comment", perms.feedComment ),
    new ElevationEntryType( "elevate", perms.feedElevate ),
    new ElevationEntryType( "deelevate", perms.feedDeelevate )
]