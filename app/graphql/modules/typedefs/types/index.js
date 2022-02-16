const { RoomDocument } = require("./RoomDocument");
const { AppTypeDocument } = require("./AppTypeDocument");
const { StaffDocument } = require("./StaffDocument");
const { StudentDocument } = require("./StudentDocument");
const { UserDocument } = require("./UserDocument");
const { FeedEntryDocument } = require("./FeedEntryDocument");
const { FeedEntryCommentDocument } = require("./FeedEntryCommentDocument");
const { FeedEntryComment } = require("./FeedEntryComment");
const { Auth } = require("./Auth");

module.exports = {
    RoomDocument,
    AppTypeDocument,
    StaffDocument,
    StudentDocument,
    UserDocument,
    FeedEntryDocument,
    FeedEntryCommentDocument,
    FeedEntryComment,
    Auth
}