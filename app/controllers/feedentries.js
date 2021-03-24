const FeedEntryController = require("./definitions/FeedEntryController");

module.exports = {
    commentCtrl: new FeedEntryController("comment"),
    elevateCtrl: new FeedEntryController("elevate"),
    deelevateCtrl: new FeedEntryController("deelevate"),
}