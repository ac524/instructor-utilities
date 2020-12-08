const { AppType } = require("../../models");

const SchemaController = require("../types/SchemaController");

/**
 * TYPE DEFINITIONS FOR METHODS
 */

class AppTypeController extends SchemaController {

    constructor() {

        super( 'appType', AppType );

    }

    async getEnabled() {

        return this.findMany( { search: { isDisabled: false } } );
        
    }

}

module.exports = AppTypeController;