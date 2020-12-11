const { expect } = require("chai");
const { Document } = require( "mongoose" );

const SchemaController = require("@crsm/controllers/types/SchemaController");

const TestModel = require("@crsmtest/lib/TestModel");

module.exports = function() {

    it("should return a `Document` of the given model", function(done) {

        // Arrange
        const ctrl = new SchemaController( "modelkey", TestModel );

        // Act
        const doc = ctrl.makeDoc();

        // Assert
        expect( doc ).to.be.instanceof( Document );
        expect( doc.collection.collectionName ).to.equal( TestModel.collection.collectionName );

        done();

    });

    it("should assign given data to the created `Model`", function(done) {

        // Arrange
        const ctrl = new SchemaController( "modelkey", TestModel );
        const test = { name: "A test" };

        // Act
        const doc = ctrl.makeDoc( test );

        // Assert
        expect( doc ).to.include( test );

        done();

    });

}