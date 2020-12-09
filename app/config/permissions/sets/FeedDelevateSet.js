const PermissionSet = require("../PermissionSet");

class FeedDelevateSet extends PermissionSet {

    constructor() {

        super( "feed delevate", [
            "create"
        ] );

    }

}

module.exports = FeedDelevateSet;