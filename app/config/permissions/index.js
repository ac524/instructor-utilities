const {
    RoomSet,
    StudentSet,
    InviteSet,
    FeedSet,
    FeedCommentSet,
    FeedElevateSet,
    FeedDeelevateSet
} = require("./sets");

module.exports = {

    room: new RoomSet(),
    student: new StudentSet(),
    invite: new InviteSet(),
    feed: new FeedSet(),
    feedComment: new FeedCommentSet(),
    feedElevate: new FeedElevateSet(),
    feedDeelevate: new FeedDeelevateSet(),

    /**
     * ROOM PERMISSIONS
     */
    VIEW_ROOM: "VIEW_ROOM",
    UPDATE_ROOM: "UPDATE_ROOM",
    LEAVE_ROOM: "LEAVE_ROOM",
    ARCHIVE_ROOM: "ARCHIVE_ROOM",

    /**
     * INVITE PERMISSIONS
     */
    CREATE_INVITE: "CREATE_INVITE",
    VIEW_INVITE: "VIEW_INVITE",
    DELETE_INVITE: "DELETE_INVITE",

    /**
     * STUDENT PERMISSIONS
     */
    CREATE_STUDENT: "CREATE_STUDENT",
    VIEW_STUDENT: "VIEW_STUDENT",
    UPDATE_STUDENT: "UPDATE_STUDENT",
    DELETE_STUDENT: "DELETE_STUDENT",

    /**
     * FEED PERMISSIONS
     */
    VIEW_FEED: "VIEW_FEED",

    /**
     * COMMENT PERMISSIONS
     */
    CREATE_FEED_COMMENT: "CREATE_FEED_COMMENT",
    UPDATE_FEED_COMMENT: "UPDATE_FEED_COMMENT",
    DELETE_FEED_COMMENT: "DELETE_FEED_COMMENT",

    /**
     * COMMENT PERMISSIONS
     */
    CREATE_FEED_ELEVATE: "CREATE_FEED_ELEVATE",

    /**
     * COMMENT PERMISSIONS
     */
    CREATE_FEED_DEELEVATE: "CREATE_FEED_DEELEVATE"

}