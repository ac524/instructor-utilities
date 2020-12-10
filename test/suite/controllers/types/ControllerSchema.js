const { expect } = require("chai");
const sinon = require("sinon");

const mongoose = require( "mongoose" );
const { Document } = mongoose;

const TestModel = require("../../../lib/TestModel");

const SchemaController = require("../../../../app/controllers/types/SchemaController");

describe("SchemaController", function() {

    const sandbox = sinon.createSandbox();

    afterEach(() => sandbox.restore());

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

    describe("createOne()", function() {

      /**
       * Stubs the makeDoc function after using it to create a document that can be safely stubbed and spied on.
       * @param {SchemaController} ctrl
       * 
       * @returns {Document}
       */
      const makeDocHelper = ( ctrl, data ) => {

        const doc = ctrl.makeDoc( data );

        sandbox.stub(ctrl, "makeDoc").callsFake(() => doc);
        sandbox.stub(doc, "save").callsFake(() => {});

        return doc;

      }

      it("should call the `makeDoc` method with the given data", (done) => {

        // Arrange
        const ctrl = new SchemaController( "modelkey", TestModel );
        const test = { name: "A test" };

        makeDocHelper( ctrl, test );

        // Act
        ctrl.createOne( { data: test } );

        // Assert
        expect( ctrl.makeDoc.calledWithExactly( test ) ).to.be.true;

        done();

      });

      it("should call the document's save method by default", (done) => {

        // Arrange
        const ctrl = new SchemaController( "modelkey", TestModel );
        const test = { name: "A test" };

        const doc = makeDocHelper( ctrl, test );

        // Act
        ctrl.createOne( { data: test } );

        // Assert
        expect( doc.save.calledOnce ).to.be.true;

        done();

      });

      it("should not call the document's save if configured with `save` set to false", (done) => {

        // Arrange
        const ctrl = new SchemaController( "modelkey", TestModel );
        const test = { name: "A test" };

        const doc = makeDocHelper( ctrl, test );

        // Act
        ctrl.createOne( { data: test }, { save: false } );

        // Assert
        expect( doc.save.calledOnce ).to.be.false;

        done();

      });

    });

});