const util = require("util");

const { expect } = require("chai");

const Controller = require("../../../../app/controllers/types/Controller");

describe("Controller", function() {

    describe("constructor()", function() {
  
      it("should create a Controller object", function(done) {

        // Arrange && Act
        const controller = new Controller;

        // Asset 
        expect( controller instanceof Controller ).to.equal( true );

        return done();

      });

      it("should create a `binding` property that is a proxy of the object", function(done) {

        // Arrange && Act
        const controller = new Controller;

         // Asset 
         expect( util.types.isProxy( controller.binding ) ).to.equal( true );
         expect( controller.binding instanceof Controller  ).to.equal( true );

         return done();

      });

    });

});