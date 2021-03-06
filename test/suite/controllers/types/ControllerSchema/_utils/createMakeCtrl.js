const SchemaController = require("~crsm/controllers/types/SchemaController");

const TestModel = require("~crsmtest/lib/TestModel");

const createMakeCtrl = sandbox =>
    /**
     * @returns {SchemaController}
     */
    () => {

        const ctrl = new SchemaController( "modelkey", TestModel );

        sandbox.stub( ctrl, "query" );

        return ctrl;
        
    }

module.exports = createMakeCtrl;