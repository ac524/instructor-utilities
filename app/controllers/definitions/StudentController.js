const SubSchemaController = require("../types/SubSchemaController");
const roomCtrl = require("../room");

class StudentController extends SubSchemaController {

    constructor() {

        super( "student", roomCtrl );

    }

}

module.exports = StudentController;