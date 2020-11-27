const PermissionSet = require("../PermissionSet");

class RoomSet extends PermissionSet {

    constructor() {

        super( "room", [
            "view",
            "update",
            "leave",
            "archive"
        ] );

    }

    get leave() {
        return this.makeKey( "leave" );
    }

    get archive() {
        return this.makeKey( "archive" );
    }

}

module.exports = RoomSet;