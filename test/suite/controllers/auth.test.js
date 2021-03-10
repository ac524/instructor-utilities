const chai = require("chai");
const { authenticated, login } = require("~crsm/controllers/auth");
const { User } = require("~crsm/controllers/definitions/models");
const expect = chai.expect

describe("AuthController", function() {

  describe("authenticated()", function() {

    it("should return the User object it's passed", function(done) {

      // Arrange - Configure needed data.
      const user = new User ({name: "bob"});
      
      // Act - Peform the action to test.
      const result = authenticated({ user });

      // Assert - Expect a result.
      expect( result ).to.equal( user );

      return done();

    });

  });

});