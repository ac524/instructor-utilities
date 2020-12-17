const { expect } = require("chai");

const SchemaController = require("~crsm/controllers/types/SchemaController");

const TestModel = require("~crsmtest/lib/TestModel");

module.exports = function() {

    it("should create a SchemaController object", () => {

        // Arrange and Act
        const schemaController = new SchemaController;

        // Assert
        expect( schemaController ).to.be.instanceof( SchemaController );

      });

      it("should assign the first param to the `key` property", () => {

        // Arrange
        const key = "modelkey";

        // Act
        const schemaController = new SchemaController( key );

        // Assert
        expect( schemaController.key ).to.equal( key );

      });

      it("should assign the second param to the `model` property", () => {

        // Act
        const schemaController = new SchemaController( "modelkey", TestModel );

        // Assert
        expect( schemaController.model ).to.equal( TestModel );

      });

}