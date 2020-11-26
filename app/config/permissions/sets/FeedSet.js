const PermissionSet = require("../PermissionSet");

class FeedSet extends PermissionSet {

    constructor() {

        super( "feed", [
            "view"
        ] );

    }

}

module.exports = FeedSet;