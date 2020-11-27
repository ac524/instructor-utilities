const chai = require("chai");
const { authenticated, login } = require("../../app/controllers/auth");
const { User } = require("../../app/models");
const assert = require("assert");
const expect = chai.expect


describe("Auth Controller", function() {

  describe("#authenticated()", function() {

    it("should return the User object it's passed", function(done) {

      // Configure needed data.
      const user = new User ({name: "bob"});
      
      // Peform the action to test.
      const result = authenticated({ user });

      // Assert a result.
      expect( result ).to.equal( user );

      return done();

    });

  });

});