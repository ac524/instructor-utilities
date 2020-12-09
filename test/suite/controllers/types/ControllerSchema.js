const { expect } = require("chai");
// const sinon = require("sinon");

const mongoose = require( "mongoose" );
const { Model, Document } = mongoose;

const TestModel = require("../../../lib/TestModel");

const SchemaController = require("../../../../app/controllers/types/SchemaController");


// after(function () {
//   sinon.restore();
// });

describe("SchemaController", function() {

    describe("constructor()", function() {
  
      it("should create a SchemaController object", function(done) {

        // Arrange and Act
        const schemaController = new SchemaController;

        // Assert
        expect( schemaController ).to.be.instanceof( SchemaController );

        done();

      });

      it("should assign the first param to the `key` property", function(done) {

        // Arrange
        const key = "modelkey";

        // Act
        const schemaController = new SchemaController( key );

        // Assert
        expect( schemaController.key ).to.equal( key );

        done();

      });

      it("should assign the second param to the `model` property", function(done) {

        // Act
        const schemaController = new SchemaController( "modelkey", TestModel );

        // Assert
        expect( schemaController.model ).to.equal( TestModel );

        done();

      });

    });

    describe("makeDoc()", function() {

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

    });

});