const PermissionSet = require("../PermissionSet");

class StudentSet extends PermissionSet {

    constructor() {

        super( "student", [
            "create",
            "view",
            "update",
            "delete"
        ] );

    }

}

module.exports = StudentSet;