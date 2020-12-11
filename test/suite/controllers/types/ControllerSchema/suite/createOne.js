const { expect } = require("chai");
const { createSandbox } = require("sinon");

const SchemaController = require("@crsm/controllers/types/SchemaController");

const TestModel = require("@crsmtest/lib/TestModel");

/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('mongoose').Document} Document
 */

module.exports = function() {

    const sandbox = createSandbox();

    afterEach(() => sandbox.restore());

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

}