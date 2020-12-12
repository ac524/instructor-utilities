const { expect } = require("chai");
const { createSandbox } = require("sinon");

const SchemaController = require("@crsm/controllers/types/SchemaController");

const TestModel = require("@crsmtest/lib/TestModel");

const createMakeDocHelper = sandbox => 
    /**
     * @param {SchemaController} ctrl 
     */
    ctrl => {

        // Keep a copy of the real makeDoc function.
        const makeDoc = ctrl.binding.makeDoc;

        // THEN stub the one that will be accessed.
        sandbox.stub(ctrl, "makeDoc").callsFake( data => {

            // Make the new doc.
            const doc = makeDoc( data );

            // THEN stub the doc's `save` method.
            sandbox.stub(doc, "save");

            return doc;

        });

    }

/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('mongoose').Document} Document
 */

module.exports = function() {

    const sandbox = createSandbox();

    afterEach(() => sandbox.restore());

    const makeDocHelper = createMakeDocHelper( sandbox );

    it("should call the `makeDoc` method with the given data", (done) => {

        // Arrange
        const ctrl = new SchemaController( "modelkey", TestModel );
        const test = { name: "A test" };

        makeDocHelper( ctrl );

        // Act
        ctrl.createOne( { data: test } );

        // Assert
        expect( ctrl.makeDoc.calledWithExactly( test ) ).to.be.true;

        done();

    });

    it("should call the document's save method by default", async () => {

        // Arrange
        const ctrl = new SchemaController( "modelkey", TestModel );
        const test = { name: "A test" };

        makeDocHelper( ctrl );

        // Act
        const doc = await ctrl.createOne( { data: test } );

        // Assert
        expect( doc.save.calledOnce ).to.be.true;

    });

    it("should not call the document's save if configured with `save` set to false", async () => {

        // Arrange
        const ctrl = new SchemaController( "modelkey", TestModel );
        const test = { name: "A test" };

        makeDocHelper( ctrl );

        // Act
        const doc = await ctrl.createOne( { data: test }, { save: false } );

        // Assert
        expect( doc.save.calledOnce ).to.be.false;

    });

}