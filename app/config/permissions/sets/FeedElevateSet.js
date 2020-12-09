const PermissionSet = require("../PermissionSet");

class FeedElevateSet extends PermissionSet {

    constructor() {

        super( "feed elevate", [
            "create"
        ] );

    }

}

module.exports = FeedElevateSet;