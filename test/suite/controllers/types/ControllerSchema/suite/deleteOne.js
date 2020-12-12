const { expect } = require("chai");
const { createSandbox } = require("sinon");
const ObjectId = require("mongoose").Types.ObjectId;

const SchemaController = require("@crsm/controllers/types/SchemaController");

const TestModel = require("@crsmtest/lib/TestModel");

module.exports = function() {

    const sandbox = createSandbox();

    before(() => sandbox.stub( TestModel, "deleteOne" ))

    after(() => sandbox.restore());

    it( "should call the model's deleteOne method with the provided `docId`", () => {

        // Arrange
        const ctrl = new SchemaController( "modelkey", TestModel );
        const docId = new ObjectId();

        // Act
        ctrl.deleteOne( { docId } );

        // Assert
        expect( TestModel.deleteOne.calledWithExactly( docId ) );


    } );



    it( "should call the model's deleteOne method with the provided document's `_id`", () => {

        // Arrange
        const ctrl = new SchemaController( "modelkey", TestModel );
        const doc = new TestModel({name: "A test"});

        // Act
        ctrl.deleteOne( { doc } );

        // Assert
        expect( TestModel.deleteOne.calledWithExactly( doc._id ) );


    } );

}