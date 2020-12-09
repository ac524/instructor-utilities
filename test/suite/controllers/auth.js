const chai = require("chai");
const { authenticated, login } = require("../../../app/controllers/auth");
const { User } = require("../../../app/models");
const expect = chai.expect

describe("Auth Controller", function() {

  describe("#authenticated()", function() {

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