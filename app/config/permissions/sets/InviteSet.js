const PermissionSet = require("../PermissionSet");

class InviteSet extends PermissionSet {

    constructor() {

        super( "invite", [
            "create",
            "view",
            "delete"
        ] );

    }

}

module.exports = InviteSet;