const PermissionSet = require("../PermissionSet");

class FeedDeelevateSet extends PermissionSet {

    constructor() {

        super( "feed deelevate", [
            "create"
        ] );

    }

}

module.exports = FeedDeelevateSet;