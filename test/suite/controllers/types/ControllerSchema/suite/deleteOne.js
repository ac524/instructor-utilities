const { expect } = require("chai");
const { createSandbox } = require("sinon");
const ObjectId = require("mongoose").Types.ObjectId;

const SchemaController = require("@crsm/controllers/types/SchemaController");

const TestModel = require("@crsmtest/lib/TestModel");

module.exports = function() {

    const sandbox = createSandbox();

    afterEach(() => sandbox.restore());

    it( "should call the model's deleteOne method with the provided `docId`", () => {

        // Arrange
        const ctrl = new SchemaController( "modelkey", TestModel );
        const docId = new ObjectId();
        
        sandbox.stub( TestModel, "deleteOne" );

        // Act
        ctrl.deleteOne( { docId } );

        expect( TestModel.deleteOne.calledWithExactly( docId ) );


    } );



    it( "should call the model's deleteOne method with the provided document's `_id`", () => {

        // Arrange
        const ctrl = new SchemaController( "modelkey", TestModel );
        const doc = new TestModel({name: "A test"});
        
        sandbox.stub( TestModel, "deleteOne" );

        // Act
        ctrl.deleteOne( { doc } );

        expect( TestModel.deleteOne.calledWithExactly( doc._id ) );


    } );

}