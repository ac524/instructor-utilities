const PermissionSet = require("../PermissionSet");

class FeedCommentSet extends PermissionSet {

    constructor() {

        super( "feed comment", [
            "create",
            "update",
            "delete"
        ] );

    }

}

module.exports = FeedCommentSet;