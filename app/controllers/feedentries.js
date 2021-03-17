const FeedEntryController = require("./definitions/FeedEntryController");

module.exports = {
    commentCtrl: new FeedEntryController("comment", ["recentComments"]),
    elevateCtrl: new FeedEntryController("elevate", ["elevation"]),
    deelevateCtrl: new FeedEntryController("deelevate", ["elevation"]),
}