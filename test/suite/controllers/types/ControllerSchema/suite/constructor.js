const { expect } = require("chai");

const SchemaController = require("@crsm/controllers/types/SchemaController");

const TestModel = require("@crsmtest/lib/TestModel");

module.exports = function() {

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

}