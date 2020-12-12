const { expect } = require("chai");
const { createSandbox } = require("sinon");
const ObjectId = require("mongoose").Types.ObjectId;

const SchemaController = require("@crsm/controllers/types/SchemaController");

const TestModel = require("@crsmtest/lib/TestModel");

const createMakeCtrl = sandbox =>
    /**
     * @returns {SchemaController}
     */
    () => {
        const ctrl = new SchemaController( "modelkey", TestModel );

        sandbox.stub( ctrl, "query" );

        return ctrl;
    }

module.exports = function() {

    const sandbox = createSandbox();

    const makeCtrl = createMakeCtrl(sandbox);

    before(() => {
        sandbox.stub( TestModel, "findById" );
        sandbox.stub( TestModel, "findOne" );
    });

    after(() => sandbox.restore());

    it( "should call the `query` method", () => {

        // Arrange
        const ctrl = makeCtrl();
        const docId = new ObjectId();

        // Act
        ctrl.findOne( { docId } );

        expect( ctrl.query.calledOnce ).to.be.true;

    } );

};